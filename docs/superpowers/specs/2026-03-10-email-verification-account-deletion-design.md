# Design : Vérification email & Suppression de compte

**Date** : 2026-03-10
**Status** : Approuvé

---

## 1. Vérification email

### Objectif
Bloquer l'accès au dashboard tant que l'utilisateur n'a pas vérifié son adresse email. Les utilisateurs OAuth (Google/GitHub) sont considérés comme automatiquement vérifiés.

### Base de données
- `emailVerified` (DateTime?) : existe déjà sur le modèle `User` via NextAuth
- `verificationToken` (String?) : à ajouter sur le modèle `User`

### Flow
1. Inscription credentials → compte créé avec `emailVerified: null`
2. Token généré (`crypto.randomBytes(32).toString('hex')`) → stocké en DB → email envoyé via Resend
3. Utilisateur clique `/verify-email?token=xxx`
4. `POST /api/auth/verify-email` : valide le token → `emailVerified = new Date()`, token supprimé → redirect `/dashboard`
5. OAuth : `emailVerified` rempli automatiquement par NextAuth → aucune action requise

### Middleware
Ajout dans `middleware.ts` : si utilisateur authentifié via credentials ET `emailVerified` null → redirect vers `/verify-email/pending`.

### Page d'attente (`/verify-email/pending`)
- Message expliquant qu'un email a été envoyé
- Bouton "Renvoyer l'email" → `POST /api/auth/resend-verification`
- Rate limit : 3 tentatives / 15 min (Upstash Redis)

### Nouveaux fichiers
- `app/(auth)/verify-email/page.tsx` — page de vérification (traitement token)
- `app/(auth)/verify-email/pending/page.tsx` — page d'attente
- `app/api/auth/verify-email/route.ts` — validation du token
- `app/api/auth/resend-verification/route.ts` — renvoi de l'email
- Nouvelle fonction `sendVerificationEmail()` dans `lib/email/resend.ts`

---

## 2. Suppression de compte

### Objectif
Permettre à un utilisateur de supprimer définitivement son compte et toutes ses données, avec une confirmation explicite pour éviter les suppressions accidentelles.

### UI
Nouvelle section "Zone dangereuse" en bas de `/dashboard/settings` :
- Bouton rouge "Supprimer mon compte" → ouvre un dialog
- Dialog : avertissement + champ texte où l'utilisateur doit taper `je veux supprimer mon compte`
- Bouton "Supprimer définitivement" activé uniquement quand la phrase est exacte

### API
`DELETE /api/user` :
1. Vérifie la session
2. Supprime en cascade via Prisma :
   - CVs et toutes leurs données (Experience, Education, Skill, Language, Project, Certification, Interest, PersonalInfo)
   - Profil maître (UserProfile, UserExperience, UserEducation, etc.)
   - Paiements
   - Comptes OAuth (Account)
   - Sessions
   - L'utilisateur lui-même
3. Retourne `{ success: true }`

### Après suppression
- `signOut()` côté client
- Redirect vers `/` avec toast de confirmation

### Nouveaux fichiers
- `app/api/user/route.ts` — endpoint DELETE
- Composant `DeleteAccountSection` dans la page settings

---

## Schéma Prisma — modifications
```prisma
model User {
  // ... champs existants
  verificationToken String?  // à ajouter
}
```
Vérifier que toutes les relations ont `onDelete: Cascade`.
