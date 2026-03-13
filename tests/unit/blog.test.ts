import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getAllSlugs,
  buildBlogAlternates,
} from '@/lib/blog'

const FIXTURE_DIR = path.join(process.cwd(), 'tests/fixtures/blog')

beforeAll(() => {
  fs.mkdirSync(path.join(FIXTURE_DIR, 'test-article'), { recursive: true })
  fs.writeFileSync(
    path.join(FIXTURE_DIR, 'test-article/fr.mdx'),
    `---
title: "Article Test FR"
description: "Description test"
date: "2025-01-15"
author: "Evan Davison"
category: "conseils-cv"
tags: ["test", "cv"]
image: "/blog/test.jpg"
readingTime: 3
---
Contenu de l'article test.`
  )
  fs.mkdirSync(path.join(FIXTURE_DIR, 'en-only-article'), { recursive: true })
  fs.writeFileSync(
    path.join(FIXTURE_DIR, 'en-only-article/en.mdx'),
    `---
title: "EN Only Article"
description: "EN description"
date: "2025-02-01"
author: "Evan Davison"
category: "guides"
tags: ["ats"]
---
EN content only.`
  )
})

afterAll(() => {
  fs.rmSync(FIXTURE_DIR, { recursive: true, force: true })
})

describe('getAllPosts', () => {
  it('retourne uniquement les posts de la locale demandée', () => {
    const posts = getAllPosts('fr', FIXTURE_DIR)
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Article Test FR')
    expect(posts[0].locale).toBe('fr')
  })

  it('retourne les posts EN si locale=en', () => {
    const posts = getAllPosts('en', FIXTURE_DIR)
    expect(posts).toHaveLength(1)
    expect(posts[0].slug).toBe('en-only-article')
  })

  it('trie par date décroissante', () => {
    const posts = getAllPosts('en', FIXTURE_DIR)
    expect(posts[0].date).toBe('2025-02-01')
  })

  it('calcule availableLocales correctement', () => {
    const posts = getAllPosts('fr', FIXTURE_DIR)
    expect(posts[0].availableLocales).toEqual(['fr'])
  })

  it('applique le fallback image si absente', () => {
    const posts = getAllPosts('en', FIXTURE_DIR)
    expect(posts[0].image).toBe('/og-image.png')
  })
})

describe('getPostBySlug', () => {
  it("retourne null si le fichier n'existe pas", () => {
    const result = getPostBySlug('test-article', 'en', FIXTURE_DIR)
    expect(result).toBeNull()
  })

  it('retourne les données correctes pour un slug/locale valide', () => {
    const result = getPostBySlug('test-article', 'fr', FIXTURE_DIR)
    expect(result).not.toBeNull()
    expect(result!.frontmatter.title).toBe('Article Test FR')
    expect(result!.frontmatter.category).toBe('conseils-cv')
    expect(result!.source).toContain("Contenu de l'article test.")
  })
})

describe('getPostsByCategory', () => {
  it('filtre par catégorie', () => {
    const posts = getPostsByCategory('conseils-cv', 'fr', FIXTURE_DIR)
    expect(posts).toHaveLength(1)
    expect(posts[0].slug).toBe('test-article')
  })

  it('retourne tableau vide si catégorie inconnue', () => {
    const posts = getPostsByCategory('inexistant', 'fr', FIXTURE_DIR)
    expect(posts).toHaveLength(0)
  })
})

describe('getAllSlugs', () => {
  it('retourne tous les slugs disponibles', () => {
    const slugs = getAllSlugs(FIXTURE_DIR)
    expect(slugs.map((s) => s.slug)).toContain('test-article')
    expect(slugs.map((s) => s.slug)).toContain('en-only-article')
  })
})

describe('buildBlogAlternates', () => {
  it('génère les alternates uniquement pour les locales disponibles', () => {
    const result = buildBlogAlternates('test-article', ['fr'])
    expect(result.languages).toHaveProperty('fr')
    expect(result.languages).not.toHaveProperty('en')
  })

  it('génère les deux alternates si les deux locales dispo', () => {
    const result = buildBlogAlternates('test-article', ['fr', 'en'])
    expect(result.languages).toHaveProperty('fr')
    expect(result.languages).toHaveProperty('en')
  })
})
