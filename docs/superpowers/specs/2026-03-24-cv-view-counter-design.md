# Page CV Public — Améliorations : Compteur de vues, Bannière & Mobile

**Date :** 2026-03-24

## Objectif

Trois améliorations sur la page publique de partage de CV (`app/[locale]/cv/[slug]/page.tsx`) :

1. **Compteur de vues** — afficher combien de fois le CV a été consulté (sans compter l'owner)
2. **Redesign de la bannière CTA** — meilleure lisibilité et impact visuel
3. **Adaptation mobile** — le CV ne doit plus déborder sur les petits écrans

---

## 1. Compteur de vues

### Schéma de données

Ajout d'un champ sur le modèle `Resume` :

```prisma
viewCount Int @default(0)
```

Migration : `prisma db push` (non-destructif, valeur par défaut 0 pour tous les CV existants).

### Logique d'incrément

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
4. Si le visiteur EST l'owner → ne pas incrémenter, `displayCount = resume.viewCount`
5. Utiliser `displayCount` pour l'affichage

**Notes :**
- `{ increment: 1 }` Prisma génère `UPDATE SET viewCount = viewCount + 1` — atomique, pas de race condition.
- Pas de rate-limiting par IP (hors scope, YAGNI).
- Le propriétaire voit le compteur réel sans le modifier.

### Affichage du compteur

- **Page publique** : dans la bannière CTA (voir section 2), afficher `• X vues` à droite uniquement si `displayCount > 0`.
- **Panel de partage dans l'éditeur** : sous le lien à copier, afficher `👁 X vues` uniquement si `isPublic === true` ET `viewCount > 0`.
- Si `viewCount === 0` → ne rien afficher nulle part (évite "0 vues" décourageant pour un CV nouvellement partagé).

### Traductions i18n (compteur)

Dans l'objet `editor` de `messages/fr.json`, `en.json`, `es.json` :

- FR : `"shareViews": "{count} vue(s)"`
- EN : `"shareViews": "{count} view(s)"`
- ES : `"shareViews": "{count} visita(s)"`

Syntaxe next-intl v4 : `t('shareViews', { count: viewCount })` avec accolades simples `{count}`.

---

## 2. Redesign de la bannière CTA

**Fichier :** `app/[locale]/cv/[slug]/page.tsx`

### Design retenu : Bordeaux redesigné

Remplacer la bannière actuelle par un gradient bordeaux avec badge logo, tagline et bouton CTA blanc inversé :

```tsx
<div className="bg-gradient-to-r from-[#722F37] to-[#8B3A44] py-2.5 px-4 flex items-center justify-between gap-4">
  {/* Gauche : badge + tagline */}
  <div className="flex items-center gap-3 min-w-0">
    <div className="bg-white/15 rounded px-2 py-0.5 shrink-0">
      <span className="text-white font-black text-xs tracking-wide">CV BUILDER</span>
    </div>
    <span className="text-white/75 text-xs hidden sm:block truncate">
      {t('bannerTagline')}
    </span>
  </div>

  {/* Droite : compteur + CTA */}
  <div className="flex items-center gap-3 shrink-0">
    {displayCount > 0 && (
      <span className="text-white/60 text-xs hidden sm:block">
        • {displayCount} {t('bannerViews')}
      </span>
    )}
    <Link
      href="/signup"
      className="bg-white text-[#722F37] text-xs font-bold px-3 py-1.5 rounded whitespace-nowrap hover:bg-white/90 transition-colors"
    >
      {t('bannerCta')}
    </Link>
  </div>
</div>
```

### Traductions i18n (bannière)

Nouveau namespace `publicCv` dans `messages/fr.json`, `en.json`, `es.json` :

| Clé | FR | EN | ES |
|-----|----|----|-----|
| `bannerTagline` | `"Ce CV a été créé avec notre outil gratuit"` | `"This resume was created with our free tool"` | `"Este CV fue creado con nuestra herramienta gratuita"` |
| `bannerCta` | `"Créer le mien →"` | `"Create mine →"` | `"Crear el mío →"` |
| `bannerViews` | `"vues"` | `"views"` | `"visitas"` |

Le compteur est rendu directement (`{displayCount}`) suivi du mot traduit — pas d'interpolation ICU nécessaire ici.

---

## 3. Adaptation mobile

### Design retenu : Zoom automatique CSS

Le CV (format A4, 794px de large) est mis à l'échelle via CSS `transform: scale()` pour tenir dans l'écran mobile. L'utilisateur peut pincer pour zoomer nativement.

### Composant client de scaling

Créer `app/[locale]/cv/[slug]/cv-scaler.tsx` — petit composant `"use client"` qui applique le scale au montage :

```tsx
'use client'
import { useEffect, useRef } from 'react'

export function CvScaler({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const cvWidth = 794
    const screenWidth = window.innerWidth
    if (screenWidth < cvWidth) {
      const scale = screenWidth / cvWidth
      el.style.transform = `scale(${scale})`
      el.style.transformOrigin = 'top center'
      el.style.marginBottom = `${(scale - 1) * el.offsetHeight}px`
    }
  }, [])

  return (
    <div ref={wrapperRef} data-cv-container style={{ width: '794px' }}>
      {children}
    </div>
  )
}
```

### Utilisation dans la page

```tsx
<div className="min-h-screen bg-[#F3EDE5] overflow-x-hidden">
  {/* Bannière */}
  ...
  {/* CV centré */}
  <div className="py-6 flex justify-center">
    <CvScaler>
      <TemplateComponent data={cvData} locale={locale} />
    </CvScaler>
  </div>
</div>
```

**Notes :**
- `overflow-x: hidden` sur le parent évite tout débordement résiduel sur mobile.
- `marginBottom` négatif compense l'espace laissé par `transform: scale()` (CSS transform ne réduit pas le flux du document).
- Le composant ne fait rien sur desktop (screenWidth >= 794px → pas de scale appliqué).

---

## Ce qui n'est PAS dans le scope

- Historique des vues par jour/semaine
- Déduplication par IP
- Notifications email au propriétaire
- Vue "liste" ou "résumé" simplifiée pour mobile

---

## Fichiers concernés

| Action | Fichier |
|--------|---------|
| Modifier | `prisma/schema.prisma` — ajout `viewCount` |
| Modifier | `app/[locale]/cv/[slug]/page.tsx` — incrément, bannière redesignée, intégration CvScaler |
| Créer | `app/[locale]/cv/[slug]/cv-scaler.tsx` — composant client de scaling mobile |
| Modifier | `app/[locale]/(dashboard)/dashboard/resumes/[id]/edit/resume-editor.tsx` — affichage `viewCount` dans le panel de partage |
| Modifier | `messages/fr.json` — clé `shareViews` (objet `editor`) + namespace `publicCv` |
| Modifier | `messages/en.json` — idem |
| Modifier | `messages/es.json` — idem |
