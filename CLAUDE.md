# ResumeForge - Instructions Claude Code

## Projet
Générateur de CV intelligent avec IA (Next.js 15 + TypeScript + Prisma + Claude API).

## Système Multi-Agents

Ce projet utilise un système de 7 agents spécialisés. **Consulte les agents appropriés avant chaque action significative.**

### Agents Disponibles
| Agent | Fichier | Quand l'utiliser |
|-------|---------|------------------|
| 🏗️ ARCHITECT | `.claude/agents/architect.md` | Structure, nouveaux fichiers, patterns |
| 💻 DEVELOPER | `.claude/agents/developer.md` | Implémentation de code |
| 🔍 REVIEWER | `.claude/agents/reviewer.md` | Analyse qualité, review |
| 🔒 SECURITY | `.claude/agents/security.md` | API routes, auth, inputs |
| 🧪 TEST | `.claude/agents/test.md` | Écriture de tests |
| 🧹 REFACTOR | `.claude/agents/refactor.md` | Simplification de code |
| 📚 DOCUMENTATION | `.claude/agents/documentation.md` | Comments, README, docs |

## Workflow Standard

Pour chaque feature :
1. **[ARCHITECT]** → Valider l'architecture
2. **[SECURITY]** → Identifier les risques
3. **[DEVELOPER]** → Implémenter
4. **[REVIEWER]** → Analyser la qualité
5. **[TEST]** → Écrire les tests
6. **[DOCUMENTATION]** → Documenter

## Format de Réponse Attendu

```markdown
## 🎯 Feature: [Nom]

### [ARCHITECT] 🏗️ Validation
[Analyse de l'architecture]

### [DEVELOPER] 💻 Implémentation
[Code créé]

### [SECURITY] 🔒 Audit
[Vérifications sécurité]

### [REVIEWER] 🔍 Feedback
[Points forts et améliorations]
```

## Conventions du Projet

- **Server Components** par défaut
- **TypeScript strict** - pas de `any`
- **Tailwind** pour le styling
- **Zod** pour la validation
- **Prisma** pour la DB

## Structure
```
app/           → Pages et API (App Router)
components/    → Composants React
lib/           → Logique métier
types/         → Types TypeScript
hooks/         → Hooks personnalisés
prisma/        → Schema DB
tests/         → Tests
.claude/agents → Prompts des agents
```