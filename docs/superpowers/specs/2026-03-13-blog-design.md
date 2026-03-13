# Blog / Contenu éditorial — Design Spec

**Date :** 2026-03-13
**Projet :** resume-forge (CV Builder)
**Auteur :** Evan Davison
**Statut :** Approuvé

---

## Objectif

Ajouter un blog éditorial bilingue (FR + EN) pour attirer des backlinks naturels, renforcer l'autorité SEO du domaine et maillage interne avec les pages longue traîne existantes. Les articles ciblent des requêtes à intention informationnelle : guides par métier, conseils CV, comparatifs templates, articles ATS.

---

## Architecture

### Gestion du contenu

**Technologie : `next-mdx-remote`**

Fichiers MDX stockés dans le repo git. Zéro CMS, zéro base de données. Parsing côté serveur à chaque requête (SSG via `generateStaticParams`).

### Structure des fichiers

```
content/
└── blog/
    ├── [slug]/
    │   ├── fr.mdx        ← article français (optionnel)
    │   └── en.mdx        ← article anglais (optionnel)
    └── ...
```

Chaque fichier contient un frontmatter YAML + contenu MDX.

**Frontmatter standard :**
```yaml
---
title: "Titre de l'article"
description: "Description SEO (155 caractères max)"
date: "2025-01-15"
author: "Evan Davison"
category: "conseils-cv"
tags: ["tag1", "tag2"]
image: "/blog/nom-image.jpg"
readingTime: 7
---
```

Règle : si seul `fr.mdx` existe → page accessible uniquement sur `/fr/blog/[slug]`. Si les deux existent → hreflang complet FR ↔ EN.

---

## Routes Next.js

```
app/[locale]/blog/
├── page.tsx                            → /fr/blog  /en/blog
├── [slug]/page.tsx                     → /fr/blog/cv-reconversion-2025
└── category/[category]/page.tsx        → /fr/blog/category/conseils-cv
```

Toutes les pages sont générées statiquement (`generateStaticParams`).

---

## Catégories

| Slug | Label FR | Label EN |
|---|---|---|
| `conseils-cv` | Conseils CV | Resume Tips |
| `par-metier` | Par métier | By Job Title |
| `templates` | Templates | Templates |
| `guides` | Guides | Guides |

---

## Composants

```
components/blog/
├── blog-card.tsx           — carte article (image, titre, date, catégorie, tags, extrait)
├── blog-grid.tsx           — grille responsive de BlogCard
├── category-filter.tsx     — barre de filtres par catégorie ("use client")
├── blog-header.tsx         — header listing (titre + description)
├── blog-post-layout.tsx    — layout article (prose, breadcrumb, meta)
├── reading-time.tsx        — badge "7 min de lecture"
└── related-posts.tsx       — articles similaires + liens pages longue traîne
```

### Utilitaires

```
lib/blog.ts
├── getAllPosts(locale)              — retourne tous les posts triés par date
├── getPostBySlug(slug, locale)     — lit un MDX spécifique
├── getPostsByCategory(cat, locale) — filtre par catégorie
└── getAllSlugs()                    — pour generateStaticParams
```

---

## Data Flow

```
Build time:
  getAllSlugs()
    └── [slug] × [locale] → generateStaticParams → pages statiques

Request time:
  getPostBySlug(slug, locale)
    ├── si fichier manquant → notFound()
    └── parse frontmatter + MDX → rendu
```

---

## SEO

### Page listing `/blog`

- `title` et `description` depuis i18n (`blog.listingTitle`, `blog.listingDescription`)
- `alternates: buildAlternates('/blog', locale)`

### Page article `/blog/[slug]`

```ts
{
  title: frontmatter.title,
  description: frontmatter.description,
  alternates: buildAlternates(`/blog/${slug}`, locale),
  openGraph: {
    type: 'article',
    publishedTime: frontmatter.date,
    authors: [frontmatter.author],
    images: [frontmatter.image],
  }
}
```

### JSON-LD : BlogPostingJsonLd

Nouveau composant dans `components/seo/json-ld.tsx` :

```ts
export function BlogPostingJsonLd({ title, description, date, author, image, url, tags, locale })
// @type: BlogPosting
// headline, description, author (Person), datePublished, dateModified
// image, url, inLanguage, publisher (Organization), keywords
```

### Sitemap

`app/sitemap.ts` étendu avec des entrées dynamiques :
```ts
const frPosts = getAllPosts('fr')
const enPosts = getAllPosts('en')
// → entrées avec lastModified = frontmatter.date
```

---

## Maillage interne

Chaque article inclut :
1. **Articles similaires** — 3 cards (même catégorie ou tags communs)
2. **Pages longue traîne liées** — liens vers les pages SEO existantes pertinentes (ex: article sur le CV développeur → lien vers `/cv-developpeur`)

---

## Mise en page

### Listing `/blog`

```
[Header: titre + description]
[Filtre: Tous | Conseils CV | Par métier | Templates | Guides]
[Grid 3 colonnes — BlogCard]
  [image / catégorie / titre / extrait / date / tags]
[Pagination si > 12 articles]
```

### Article `/blog/[slug]`

```
[Breadcrumb: Accueil > Blog > Titre]
[H1 titre]
[Meta: date · auteur · temps de lecture · catégorie]
[Image hero]
[Contenu MDX — prose typographique Tailwind]
[Section: Articles similaires (3 cards)]
[Section: Pages liées]
[CTA finale: Créer mon CV]
```

---

## Articles initiaux (22 articles)

### Articles FR (12)

| Slug | Titre | Catégorie |
|---|---|---|
| `cv-reconversion-2025` | CV pour reconversion professionnelle en 2025 | conseils-cv |
| `comment-faire-un-cv-developpeur` | Comment faire un CV de développeur qui passe les ATS | par-metier |
| `cv-infirmier-guide-complet` | CV infirmier : guide complet + exemples | par-metier |
| `cv-alternance-conseils` | CV alternance : 10 conseils pour décrocher un entretien | par-metier |
| `cv-sans-experience-astuces` | CV sans expérience : comment valoriser son profil | conseils-cv |
| `erreurs-cv-a-eviter` | Les 8 erreurs de CV qui font perdre des entretiens | conseils-cv |
| `cv-moderne-vs-classique` | CV moderne ou classique : lequel choisir en 2025 ? | templates |
| `optimiser-cv-ats` | Optimiser son CV pour les logiciels ATS en 2025 | guides |
| `cv-linkedin-coherence` | CV et LinkedIn : comment les rendre cohérents | guides |
| `lettre-motivation-vs-cv` | Lettre de motivation vs CV : ce que les recruteurs lisent vraiment | conseils-cv |
| `cv-chef-de-projet-guide` | CV chef de projet : compétences clés et exemples | par-metier |
| `cv-commercial-techniques` | CV commercial : mettre en avant ses chiffres | par-metier |

### Articles EN (10)

| Slug | Titre | Catégorie |
|---|---|---|
| `how-to-beat-ats-2025` | How to Beat ATS Systems in 2025 (Complete Guide) | guides |
| `software-engineer-resume-guide` | Software Engineer Resume: What Actually Gets You Hired | par-metier |
| `resume-summary-writing-guide` | How to Write a Resume Summary That Gets Noticed | conseils-cv |
| `ats-friendly-resume-tips` | 7 ATS-Friendly Resume Tips Recruiters Won't Tell You | guides |
| `career-change-resume-guide` | Career Change Resume: How to Reframe Your Experience | conseils-cv |
| `resume-keywords-guide` | Resume Keywords: How to Find and Use Them Effectively | guides |
| `modern-vs-traditional-resume` | Modern vs Traditional Resume: Which One to Use in 2025 | templates |
| `nurse-resume-tips` | Nurse Resume Tips: Stand Out in a Competitive Market | par-metier |
| `entry-level-resume-guide` | Entry-Level Resume Guide: No Experience, No Problem | conseils-cv |
| `resume-mistakes-to-avoid` | 9 Resume Mistakes That Are Costing You Interviews | conseils-cv |

---

## Précisions techniques

### next-mdx-remote RSC
Utiliser `compileMDX` depuis `next-mdx-remote/rsc` (API RSC de la v5+), pas l'ancienne API client-side.

```ts
import { compileMDX } from 'next-mdx-remote/rsc'
const { content, frontmatter } = await compileMDX({ source, options: { parseFrontmatter: true } })
```

### hreflang pour articles unilingues
`buildAlternates` génère toujours FR + EN. Pour les articles disponibles dans une seule langue, créer `buildBlogAlternates(slug, availableLocales)` dans `lib/blog.ts` qui n'inclut que les locales pour lesquelles le fichier MDX existe.

### Image manquante
Si `image` n'est pas défini dans le frontmatter → fallback vers `/og-image.png` (image OG générique du site).

### Sitemap async
`app/sitemap.ts` doit être `async` pour appeler `getAllPosts()` (lecture filesystem).

---

## Dépendances à ajouter

```bash
npm install next-mdx-remote gray-matter
```

- `next-mdx-remote` v5+ — parsing et rendu MDX côté serveur (API RSC)
- `gray-matter` — extraction du frontmatter YAML (utilisé uniquement dans `getAllPosts` pour lire les métadonnées sans parser le MDX complet)

---

## Hors périmètre

- Interface d'édition / CMS
- Commentaires
- Recherche full-text
- Newsletter / abonnement
- Auteurs multiples
