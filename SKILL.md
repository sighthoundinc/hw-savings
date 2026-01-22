---
name: warping
description: Apply warping framework standards for AI-assisted development. Use when starting projects, writing code, running tests, making commits, or when the user references warping, project standards, or coding guidelines.
user-invocable: false
---

# Warping Framework

A layered framework for AI-assisted development with consistent standards and workflows.

## When This Skill Activates

This skill automatically loads when you:
- Start work in a warping-enabled project (has `./warping/` directory)
- Reference warping, project standards, or coding conventions
- Run tests, make commits, or perform quality checks
- Ask about project structure, workflows, or best practices

## Core Principle: Rule Precedence

Warping uses hierarchical rules where more specific overrides general:

```
user.md          ← HIGHEST precedence (personal preferences)
  ↓
project.md       ← Project-specific rules
  ↓
{language}.md    ← Language standards (python.md, go.md, typescript.md, cpp.md)
  ↓
{tool}.md        ← Tool guidelines (taskfile.md, git.md)
  ↓
main.md          ← General AI behavior
  ↓
specification.md ← LOWEST precedence (requirements)
```

**IMPORTANT**: If `user.md` says one thing and `python.md` says another, `user.md` ALWAYS wins.

## File Reading Strategy (Lazy Loading)

**DO NOT** read all warping files at once. Read only what you need:

1. **Always start with**: `./warping/main.md` (general guidelines)
2. **Check for**: `./warping/core/user.md` (personal overrides - highest precedence)
3. **Check for**: `./warping/core/project.md` (project-specific rules)
4. **Then read language-specific** only if working with that language:
   - `./warping/languages/python.md`
   - `./warping/languages/go.md`
   - `./warping/languages/typescript.md`
   - `./warping/languages/cpp.md`
5. **Read tool files** only when using that tool:
   - `./warping/tools/taskfile.md` (when running tasks)
   - `./warping/scm/git.md` (when using git)
   - `./warping/scm/github.md` (when using GitHub)

## Task-Centric Workflow

Warping projects use **Taskfile** as the universal task runner.

### Discovery
```bash
task --list        # See all available tasks
task               # Same as task --list
```

### Common Tasks
```bash
task check         # Pre-commit checks (fmt, lint, test, coverage)
task test          # Run tests
task test:coverage # Run with coverage
task fmt           # Format code
task lint          # Lint code
task build         # Build project
task clean         # Clean artifacts
```

**CRITICAL**: Before commits, ALWAYS run `task check`. Never claim checks passed without running them.

## Test-Driven Development (TDD)

Warping embraces TDD by default:

1. **Write test first** - Define expected behavior
2. **Watch it fail** - Confirm test fails correctly
3. **Implement** - Write minimal code to pass
4. **Refactor** - Improve while keeping tests green
5. **Repeat** - Build incrementally

**Coverage Requirements**:
- Default: ≥85% coverage (overall + per-module)
- Check `project.md` for project-specific thresholds
- Never claim coverage passes without running `task test:coverage`

## Spec-Driven Development (SDD)

For new features or projects:

1. **Start with PRD.md** - Run `warping.sh spec` to create Product Requirements Document
2. **AI Interview** - Answer focused questions to clarify requirements
3. **Generate SPECIFICATION.md** - Complete spec with phases, dependencies, and tasks
4. **Implement** - Build according to spec

## Quality Standards

### Before Every Commit
```bash
task check  # MUST run this
```

This typically includes:
- Code formatting
- Linting
- Type checking
- Tests with coverage
- Any project-specific checks

### Conventional Commits
ALL commits must follow https://www.conventionalcommits.org/en/v1.0.0/:

```
feat: add new feature
fix: resolve bug
docs: update documentation
chore: routine tasks
test: add/update tests
refactor: code restructuring
```

### File Naming
- Use **hyphens** in filenames, not underscores
- Example: `user-service.py` NOT `user_service.py`
- Exception: Language conventions (Python modules can use underscores in code)

### Secrets Management
- Store secrets in `secrets/` directory
- Provide `.example` templates
- Never commit actual secrets
- Use environment variables in code

## Language-Specific Standards

### Python
- Testing: pytest, ≥85% coverage
- Style: ruff, black, isort (PEP 8)
- Types: mypy strict mode
- Docs: PEP 257 docstrings

### Go
- Testing: Testify, ≥85% coverage
- Docs: go.dev/doc/comment
- Patterns: table-driven tests, interface design

### TypeScript
- Testing: Vitest/Jest, ≥85% coverage
- Style: ESLint, Prettier
- Types: strict mode, no `any`

### C++
- Testing: Catch2/GoogleTest, ≥85% coverage
- Standard: C++20/23
- Style: clang-format, clang-tidy

## Project Initialization

### For New Projects
```bash
# Initialize warping
warping.sh init

# Set up user preferences (first time only)
warping.sh bootstrap

# Configure project
warping.sh project

# Generate specification (optional)
warping.sh spec
```

### For Existing Projects
1. Check for `./warping/` directory
2. Read `main.md` for general guidelines
3. Read `project.md` for project-specific rules
4. Follow task-based workflows: `task --list`

## Self-Improvement Mechanism

Warping learns and evolves:

- `meta/lessons.md` - Patterns learned during development (AI can update)
- `meta/ideas.md` - Future improvements noticed
- `meta/suggestions.md` - Project-specific suggestions

When you discover a better pattern or make repeated corrections, consider updating `lessons.md`.

## Safety and Best Practices

### Version Control
- Never force-push without explicit permission
- Assume production impact unless stated otherwise
- Prefer small, reversible changes
- Call out risks explicitly

### Code Quality
- Run `task check` before EVERY commit
- Verify tests pass: `task test`
- Check coverage meets threshold: `task test:coverage`
- Never claim checks passed without running them

### Documentation
- Keep docs in `docs/` directory, not project root
- Update docs when changing behavior
- Use RFC2119 notation in technical docs (!, ~, ?, ⊗, ≉)

## Working with Warping

### First Time in a Project
1. Check for `./warping/` directory
2. Read `./warping/main.md`
3. Check `./warping/core/user.md` for user preferences
4. Check `./warping/core/project.md` for project rules
5. Run `task --list` to see available tasks

### During Development
1. Write tests first (TDD)
2. Implement features
3. Run `task check` frequently
4. Before commit: ALWAYS `task check`
5. Use Conventional Commits format
6. Push changes

### When Stuck
- Check `./warping/REFERENCES.md` for guidance on which files to read
- Review `meta/lessons.md` for learned patterns
- Consult language-specific files in `./warping/languages/`
- Check `Taskfile.yml` for available commands

## Example Workflows

### Starting a Feature
```bash
# 1. Write test first (TDD)
# 2. Watch it fail
task test

# 3. Implement feature
# 4. Run checks
task check

# 5. Commit
git commit -m "feat: add new feature"
```

### Code Review
```bash
# 1. Run quality checks
task check

# 2. Review coverage
task test:coverage

# 3. Check commit format (Conventional Commits)
git log --oneline -n 5

# 4. Suggest improvements → meta/suggestions.md
```

### Bug Fix
```bash
# 1. Write failing test that reproduces bug
# 2. Fix code
# 3. Verify test passes
task test

# 4. Run full checks
task check

# 5. Commit
git commit -m "fix: resolve issue with X"
```

## Integration Notes

### With Claude Code
- This SKILL.md file teaches Claude Code about warping
- Place in project root or `~/.claude/skills/warping/`
- Claude automatically applies these rules when relevant

### With Warp AI
- Upload warping files to Warp Drive
- Create Warp rules referencing warping/*.md files
- Use `WARP.md` or `AGENTS.md` in project root

### File Locations
- **Personal skills**: `~/.claude/skills/warping/SKILL.md`
- **Project skills**: `.claude/skills/warping/SKILL.md`
- **Warping files**: `./warping/*.md`

## Quick Reference

| Task | Command |
|------|---------|
| List tasks | `task` or `task --list` |
| Pre-commit checks | `task check` |
| Run tests | `task test` |
| Check coverage | `task test:coverage` |
| Format code | `task fmt` |
| Lint code | `task lint` |
| Initialize warping | `warping.sh init` |
| Configure user | `warping.sh bootstrap` |
| Configure project | `warping.sh project` |
| Generate spec | `warping.sh spec` |

## Remember

1. **Lazy load files** - Only read what you need
2. **User.md is king** - Highest precedence always
3. **Task-centric** - Use `task` for everything
4. **Test first** - Write tests before implementation
5. **Always check** - Run `task check` before commits
6. **Conventional commits** - Follow the standard
7. **Coverage matters** - ≥85% by default
8. **Never lie** - Don't claim checks passed without running them

---

For more details, read the specific files in `./warping/` as needed. Start with `main.md` and follow the precedence hierarchy.
