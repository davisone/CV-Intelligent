# Spec — Formulaire de contact

**Date** : 2026-03-11
**Projet** : resume-forge (CV Builder)
**Statut** : Validé

---

## Objectif

Ajouter une page de contact dédiée `/contact` permettant aux utilisateurs d'envoyer un message directement à l'équipe CV Builder. L'email est transmis via Resend et un email de confirmation est envoyé à l'expéditeur.

---

## Architecture

### Fichiers à créer

- `app/(legal)/contact/page.tsx` — Page de contact avec formulaire client
- `app/api/contact/route.ts` — Route API POST qui traite l'envoi
- `lib/email/contact.ts` — Fonctions d'envoi email (notification + confirmation)
- `lib/validations/contact.schema.ts` — Schéma Zod de validation (convention `.schema.ts` du projet)
- `components/ui/select.tsx` — Composant Select natif stylé Tailwind (manquant dans le projet)

### Fichiers à modifier

- `components/layout/footer.tsx` — Ajouter lien "Contact" dans la colonne Ressources
- `lib/rate-limit/index.ts` — Ajouter export `CONTACT_RATE_LIMITS`
- `.env.example` — Ajouter `CONTACT_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

### Note sur le placement de la page

La page est placée dans le groupe `(legal)` car il fournit un layout minimal sans dashboard, adapté aux pages publiques standalone. Ce placement est intentionnel et accepté. Si ce groupe évolue dans le futur (header spécifique légal), la page contact devra être déplacée dans un groupe `(public)` dédié.

---

## Formulaire

### Champs

| Champ   | Type     | Validation                        |
|---------|----------|-----------------------------------|
| Nom     | text     | Requis, 2–100 caractères          |
| Email   | email    | Requis, format email valide       |
| Sujet   | select   | Requis, parmi les options définies|
| Message | textarea | Requis, 10–2000 caractères        |

### Options du champ Sujet

- Question générale
- Problème technique
- Suggestion d'amélioration
- Autre

---

## API Route — `POST /api/contact`

Ordre d'exécution (conforme au pattern existant du projet) :

1. **Vérifier le rate limit Upstash en premier** (avant tout parsing du body)
2. Valider le payload avec Zod
3. Envoyer l'email de notification à `CONTACT_EMAIL`
4. Envoyer l'email de confirmation à l'expéditeur (non bloquant)
5. Retourner `{ success: true }` ou une erreur HTTP appropriée

### Comportement en cas d'erreur partielle

- Si l'email de notification (étape 3) échoue → retourner `500` (le message n'est pas arrivé)
- Si l'email de confirmation (étape 4) échoue → logger l'erreur mais retourner `200` (le message est arrivé, la confirmation est secondaire)

### Guard sur CONTACT_EMAIL

Si `process.env.CONTACT_EMAIL` est absent, retourner `500` immédiatement avec un log d'erreur clair. Même pattern que `RESEND_API_KEY` dans `lib/email/resend.ts`.

### Codes de retour

| Code | Cas                                      |
|------|------------------------------------------|
| 200  | Succès                                   |
| 400  | Validation échouée                       |
| 429  | Rate limit dépassé                       |
| 500  | CONTACT_EMAIL absent / erreur notification|

---

## Rate Limiting

Ajouter dans `lib/rate-limit/index.ts` :

```ts
export const CONTACT_RATE_LIMITS = {
  submit: { maxRequests: 5, windowMs: 10 * 60 * 1000 }, // conforme au pattern AI_RATE_LIMITS.suggest
} as const
```

Utiliser ce constant dans la route API, comme `AUTH_RATE_LIMITS` et `AI_RATE_LIMITS` dans les routes existantes.

---

## Emails

### Email de notification (vers `CONTACT_EMAIL`)

- **De** : `FROM_EMAIL` (existant)
- **Sujet** : `[CV Builder] Nouveau message de {nom} — {sujet}`
- **Corps** : Nom, email, sujet, message, date

### Email de confirmation (vers l'expéditeur)

- **De** : `FROM_EMAIL`
- **Sujet** : `Votre message a bien été reçu — CV Builder`
- **Corps** : Accusé de réception, résumé du message envoyé, délai de réponse indicatif (48h)
- **Note** : L'envoi de cet email à toute adresse soumise par l'utilisateur expose un vecteur d'abus limité (envoi de 5 emails max à une victime par IP / 10 min). Ce risque est accepté compte tenu du rate limiting en place.

---

## Composant Select

Créer `components/ui/select.tsx` — un `<select>` HTML natif avec le style Tailwind du projet (bordure `border-[#E0D6C8]`, focus bordeaux, background crème). Pas de dépendance externe.

---

## UI / Style

- Thème bordeaux + crème (`#722F37`, `#FBF8F4`) identique au reste du site
- Composants : `Input`, `Label`, `Button`, `Card` + nouveau `Select`
- Toast de succès/erreur via Sonner (`import { toast } from 'sonner'`)
- Layout identique aux pages légales existantes
- Responsive mobile-first
- Lien "Contact" ajouté dans la colonne "Ressources" du footer

---

## Variables d'environnement

```env
CONTACT_EMAIL=contact@dvs-web.fr      # Email qui reçoit les messages
UPSTASH_REDIS_REST_URL=               # Déjà utilisé, ajouter au .env.example
UPSTASH_REDIS_REST_TOKEN=             # Déjà utilisé, ajouter au .env.example
```

---

## Ce qui est hors scope

- Pas de stockage en base de données des messages
- Pas de pièce jointe
- Pas d'authentification requise (formulaire public)
- Pas de CAPTCHA (le rate limiting suffit)
