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

1. Récupérer la session via `getServerSession(authOptions)` et le CV en parallèle via `Promise.all`
2. Si le CV n'existe pas ou `isPublic === false` → `notFound()`
3. Si le visiteur n'est PAS l'owner (`!session || session.user.id !== resume.userId`) → incrémenter de façon **atomique** :
   ```ts
   const updated = await prisma.resume.update({
     where: { id: resume.id },
     data: { viewCount: { increment: 1 } },
     select: { viewCount: true },
   })
   const displayCount = updated.viewCount
   ```
4. Si le visiteur EST l'owner → ne pas incrémenter, afficher `resume.viewCount` tel quel
5. Utiliser `displayCount` pour l'affichage sur la page

**Notes :**
- L'opération `{ increment: 1 }` de Prisma génère un `UPDATE SET viewCount = viewCount + 1` SQL atomique — pas de race condition.
- Pas de rate-limiting par IP (hors scope, YAGNI à cette échelle).
- Le propriétaire qui visite sa propre page publique voit le compteur réel sans le modifier.

---

## Affichage

### Page publique (`app/[locale]/cv/[slug]/page.tsx`)

Dans la bannière CTA bordeaux existante, ajouter le compteur à droite :

```
CV créé avec CV Builder — Créez le vôtre gratuitement        • 142 vues
```

Affiché uniquement si `displayCount > 0`. Si `displayCount === 0`, la bannière reste sans compteur.

### Panel de partage dans l'éditeur (`resume-editor.tsx`)

Le composant `ResumeEditor` reçoit déjà le `resume` en prop. Comme `viewCount` est un champ du modèle `Resume`, il sera automatiquement inclus dans la query existante qui charge le CV pour l'éditeur.

Dans le panel de partage, sous le lien à copier, afficher uniquement si `isPublic === true` ET `viewCount > 0` :

```
👁 142 vues
```

Si `viewCount === 0` → ne rien afficher (un CV nouvellement partagé n'affiche pas de compteur tant qu'il n'a pas eu de visite externe).

Clé i18n : `shareViews`

---

## Traductions i18n

Ajouter dans l'objet `editor` des fichiers `messages/fr.json`, `messages/en.json`, `messages/es.json` :

- FR : `"shareViews": "{count} vue(s)"`
- EN : `"shareViews": "{count} view(s)"`
- ES : `"shareViews": "{count} visita(s)"`

L'interpolation `{count}` est gérée par next-intl v4 avec single braces : `t('shareViews', { count: viewCount })`. C'est la syntaxe officielle next-intl (ICU message format avec `{variableName}` en accolades simples).

**Comportement "0 vues" intentionnel :** Un CV nouvellement partagé n'affiche aucun compteur tant qu'aucun visiteur externe ne l'a ouvert. C'est voulu — évite d'afficher "0 vues" qui serait décourageant pour l'owner.

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
| Modifier | `app/[locale]/(dashboard)/dashboard/resumes/[id]/edit/resume-editor.tsx` — le panel de partage (`showSharePanel`) a été ajouté en Task 3 du partage public |
| Modifier | `messages/fr.json` |
| Modifier | `messages/en.json` |
| Modifier | `messages/es.json` |
