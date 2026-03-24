# CV View Counter — Design Spec

**Date :** 2026-03-24

## Objectif

Permettre aux utilisateurs de voir combien de fois leur CV public a été consulté. Le compteur s'incrémente à chaque visite de la page publique, sauf si le visiteur est le propriétaire du CV. Le total est affiché à deux endroits : dans le panel de partage de l'éditeur et sur la page publique elle-même.

---

## Schéma de données

Ajout d'un champ sur le modèle `Resume` :

```prisma
viewCount Int @default(0)
```

Migration : `prisma db push` (non-destructif, valeur par défaut 0 pour tous les CV existants).

---

## Logique d'incrément

**Fichier :** `app/[locale]/cv/[slug]/page.tsx`

La page publique est un Server Component dynamique. Au moment du rendu :

1. Récupérer le CV via `prisma.resume.findFirst({ where: { publicSlug: slug, isPublic: true } })`
2. Récupérer la session via `getServerSession(authOptions)`
3. Si la session n'existe pas, ou si `session.user.id !== resume.userId` → incrémenter :
   ```ts
   await prisma.resume.update({
     where: { id: resume.id },
     data: { viewCount: { increment: 1 } },
   })
   ```
4. Afficher `resume.viewCount + 1` (valeur après incrément) sur la page

**Règle :** l'incrément est synchrone (awaité) avant le rendu pour afficher le bon total.

---

## Affichage

### Page publique (`app/[locale]/cv/[slug]/page.tsx`)

Dans la bannière CTA bordeaux existante, ajouter le compteur à droite :

```
CV créé avec CV Builder — Créez le vôtre gratuitement        • 142 vues
```

Affiché uniquement si `viewCount >= 1`.

### Panel de partage dans l'éditeur (`resume-editor.tsx`)

Le composant `ResumeEditor` reçoit déjà le `resume` en prop. Comme `viewCount` est un champ du modèle `Resume`, il sera automatiquement inclus dans la query existante qui charge le CV pour l'éditeur.

Dans le panel de partage, sous le lien à copier, afficher quand `isPublic === true` :

```
👁 142 vues
```

Clé i18n : `shareViewCount` (ex: `"142 vues"` / `"142 views"` / `"142 visitas"`)

---

## Traductions i18n

Ajouter dans l'objet `editor` des fichiers `messages/fr.json`, `messages/en.json`, `messages/es.json` :

```json
"shareViewCount": "{count} vue(s)"
```

- FR : `"{count} vue(s)"`
- EN : `"{count} view(s)"`
- ES : `"{count} visita(s)"`

---

## Ce qui n'est PAS dans le scope

- Historique des vues par jour/semaine
- Déduplication par IP (trop complexe, YAGNI)
- Notifications email quand le CV est consulté
- Compteur de vues unique (session-based)

---

## Fichiers concernés

| Action | Fichier |
|--------|---------|
| Modifier | `prisma/schema.prisma` |
| Modifier | `app/[locale]/cv/[slug]/page.tsx` |
| Modifier | `app/[locale]/(dashboard)/dashboard/resumes/[id]/edit/resume-editor.tsx` |
| Modifier | `messages/fr.json` |
| Modifier | `messages/en.json` |
| Modifier | `messages/es.json` |
