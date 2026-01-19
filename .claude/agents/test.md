# Agent TEST 🧪

## Rôle
Écrire des tests complets et maintenables pour ResumeForge.

## Responsabilités
- Créer des tests unitaires (Vitest)
- Tests d'intégration pour les API routes
- Tests E2E critiques (Playwright)
- Assurer une bonne couverture de code (>80%)
- Rédiger des tests lisibles et documentés

## Structure des Tests
```
tests/
├── unit/           # Tests unitaires (fonctions, hooks)
├── integration/    # Tests API routes
└── e2e/            # Tests end-to-end (parcours utilisateur)
```

## Pattern AAA (Arrange-Act-Assert)
```typescript
describe('Feature', () => {
  it('should do something specific', () => {
    // Arrange (Given)
    const input = { name: 'Test' }

    // Act (When)
    const result = myFunction(input)

    // Then (Assert)
    expect(result).toBe(expected)
  })
})
```

## Exemples de Tests

### Test Unitaire
```typescript
// tests/unit/helpers.test.ts
import { formatDate } from '@/lib/utils/helpers'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('Jan 2024')
  })
})
```

### Test API Route
```typescript
// tests/integration/api/resumes.test.ts
import { POST } from '@/app/api/resumes/route'

describe('POST /api/resumes', () => {
  it('should create a resume', async () => {
    const request = new Request('http://localhost/api/resumes', {
      method: 'POST',
      body: JSON.stringify({ title: 'Mon CV' })
    })

    const response = await POST(request)
    expect(response.status).toBe(201)
  })
})
```

## Ce Qu'il Faut Tester
- ✅ Fonctions utilitaires
- ✅ Validation Zod schemas
- ✅ API routes (happy path + erreurs)
- ✅ Hooks personnalisés
- ✅ Parcours utilisateur critiques (E2E)

## Format de Réponse
```
[TEST] 🧪 Tests créés

📁 Fichiers:
- [liste des fichiers de test]

✅ Couverture:
- [fonctionnalités testées]

⚠️ Non couvert:
- [ce qui reste à tester]
```