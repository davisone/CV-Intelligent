# Spec — Correction thin content SEO + migration i18n des 7 pages

Date : 2026-03-23
Statut : Approuvé

---

## Contexte

L'audit SEO a identifié 7 pages avec du thin content (contenu vide ou hardcodé uniquement en français) :

- **5 pages utilisant `SeoLandingPage`** sans traductions complètes → le composant tente de lire `hero.*`, `section1.*`, etc. mais seule la clé `meta` existe dans les fichiers de traduction → contenu vide rendu.
- **2 pages avec contenu custom hardcodé en français** → les routes `/en/` et `/es/` affichent du contenu FR pour les visiteurs anglophones et hispanophones.

L'objectif est de corriger le thin content sur toutes les versions linguistiques (fr/en/es) sans modifier l'architecture existante.

---

## Architecture existante (ne pas modifier)

- Composant `SeoLandingPage` (`components/seo/seo-landing-page.tsx`) — aucune modification
- Fichiers de traduction : `messages/fr.json`, `messages/en.json`, `messages/es.json`
- Namespace racine : `landing.<PageName>` pour chaque page

---

## Catégories de pages et travaux

### Catégorie A — 4 pages SeoLandingPage sans traductions

**Pages :**
| Page | Namespace | section3Type |
|------|-----------|--------------|
| `/cv-etudiant` | `landing.cvEtudiantPage` | `tips` |
| `/cv-alternance` | `landing.cvAlternancePage` | `tips` |
| `/cv-minimaliste` | `landing.cvMinimalistePage` | `tips` |
| `/cv-developpeur` | `landing.cvDeveloppeurPage` | `steps` |

**Travail :** Ajouter les clés manquantes dans `fr.json`, `en.json`, `es.json`. Aucune modification de composant.

**Structure requise par page (section3Type: tips) :**
```json
{
  "meta": { "title": "...", "description": "..." },
  "breadcrumbName": "...",
  "hero": {
    "badgeText": "...",
    "h1Before": "...",
    "h1Accent": "...",
    "h1After": "...",
    "subtitle": "...",
    "description": "...",
    "primaryCtaText": "...",
    "secondaryCtaText": "..."
  },
  "section1": {
    "title": "...",
    "subtitle": "...",
    "item0": { "title": "...", "description": "..." },
    "item1": { "title": "...", "description": "..." },
    "item2": { "title": "...", "description": "..." }
  },
  "section2": {
    "title": "...",
    "subtitle": "...",
    "item0": { "title": "...", "keyword": "...", "description": "..." },
    "item1": { "title": "...", "keyword": "...", "description": "..." },
    "item2": { "title": "...", "keyword": "...", "description": "..." },
    "item3": { "title": "...", "keyword": "...", "description": "..." }
  },
  "section3": {
    "title": "...",
    "tip0": "...",
    "tip1": "...",
    "tip2": "...",
    "tip3": "...",
    "tip4": "..."
  },
  "faq": {
    "title": "...",
    "subtitle": "...",
    "q0": { "question": "...", "answer": "..." },
    "q1": { "question": "...", "answer": "..." },
    "q2": { "question": "...", "answer": "..." },
    "q3": { "question": "...", "answer": "..." },
    "q4": { "question": "...", "answer": "..." }
  },
  "finalCta": {
    "title": "...",
    "description": "...",
    "ctaText": "..."
  }
}
```

**Structure pour section3Type: steps (cvDeveloppeurPage) :**
```json
"section3": {
  "title": "...",
  "step0": { "title": "...", "description": "..." },
  "step1": { "title": "...", "description": "..." },
  "step2": { "title": "...", "description": "..." },
  "step3": { "title": "...", "description": "..." }
}
```

---

### Catégorie B — 1 page custom server component (`/cv-pdf`)

**Fichier :** `app/[locale]/cv-pdf/page.tsx`
**Situation :** Page avec contenu riche hardcodé en français. Ne doit pas être convertie vers `SeoLandingPage`.

**Textes à extraire dans `landing.cvPdfPage` :**
- Hero : badge, h1, subtitle, description, 2 CTA
- Section avantages : titre, sous-titre, 3 avantages (title + description)
- Section étapes : titre, sous-titre, 4 étapes (title + description)
- Section features : titre, 3 features (texte)
- Section FAQ : titre, sous-titre, 4 FAQ (question + answer)
- Section CTA finale : titre, description, bouton

**Modification composant :** Remplacer les tableaux statiques (`pdfAdvantages`, `exportSteps`, `faqItems`) et tous les textes hardcodés par des appels `getTranslations('landing.cvPdfPage')`. La structure JSX ne change pas.

---

### Catégorie C — 2 pages custom à fort contenu

#### `/guide` (server component)

**Fichier :** `app/[locale]/guide/page.tsx`
**Textes à extraire dans `landing.guidePage` :**
- Hero : badge, h1, subtitle, 2 CTA
- Section steps (6 étapes) : titre, sous-titre, title + description par étape
- Section tips (8 conseils) : titre, 8 tips
- Section structure (4 blocs) : titre, sous-titre, 4 × (titre + liste 5 items)
- Section profils (3 profils) : titre, sous-titre, 3 × (title + description + lien)
- Section IA (3 features) : titre, sous-titre, 3 × (title + description)
- Section FAQ (10 questions) : titre, sous-titre, 10 × (question + answer)
- Section CTA finale : titre, description, bouton, badge

**Modification composant :** La structure JSX reste identique. Les tableaux statiques deviennent des données lues depuis les traductions (via `t.raw()`).

#### `/templates` (`'use client'`)

**Fichier :** `app/[locale]/templates/page.tsx`
**Textes à extraire dans `landing.templatesPage` :**
- Hero : h1, subtitle
- 5 templates : name, description, 3 features chacun
- Section SEO : titre, 5 descriptions de templates
- Guide de choix : titre, 6 items (label + conseil)
- Paragraphe SEO : 2 phrases
- CTA : utilise déjà `landing.cta.title` et `landing.hero.cta` → à conserver

**Modification composant :** Remplacer les données statiques par `useTranslations`. Le state React (`selectedTemplate`) et la structure JSX ne changent pas.

---

## Ordre d'implémentation

1. **Catégorie A** — fr.json, en.json, es.json pour les 4 pages SeoLandingPage
2. **Catégorie B** — fr.json, en.json, es.json pour cvPdfPage + modification cv-pdf/page.tsx
3. **Catégorie C1** — fr.json, en.json, es.json pour guidePage + modification guide/page.tsx
4. **Catégorie C2** — fr.json, en.json, es.json pour templatesPage + modification templates/page.tsx

---

## Contraintes

- Typographie : TypeScript strict, aucun `any`
- Pas de modification du composant `SeoLandingPage`
- Pas de changement de routes ou de structure de fichiers
- Le contenu en/es peut être une traduction professionnelle des textes FR
- `npm run build` doit passer sans erreur après l'implémentation

---

## Critères de succès

- Les 7 pages ont du contenu visible en fr, en et es
- Aucun texte vide ni clé de traduction manquante dans la console Next.js
- `npm run build` passe sans erreurs
- Les JSON-LD (BreadcrumbList, FAQPage, HowToJsonLd) sont correctement alimentés pour les pages Catégorie A
