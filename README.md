# create-fastapi-app

The easiest way to bootstrap a FastAPI project with proper tooling.

## Usage

```bash
npx @blen/create-fastapi-app my-api
# or
bunx @blen/create-fastapi-app my-api
# or
pnpm create @blen/fastapi-app my-api
```

## What you get

A clean FastAPI project with:
- ✅ FastAPI + Uvicorn
- ✅ Environment config (.env)
- ✅ Testing setup (pytest)
- ✅ Linting & formatting (black, ruff, mypy)
- ✅ Makefile for common tasks
- ✅ Error handling examples
- ✅ Basic project structure

## Requirements

- [uv](https://github.com/astral-sh/uv) - Fast Python package manager
- Node.js 14+

## Quick Start

After creating your project:

```bash
cd my-api
uv run uvicorn app.main:app --reload
```

Your API will be running at http://localhost:8000

- API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Development Commands

In your created project, you can run:

```bash
uv run uvicorn app.main:app --reload  # Start dev server
uv run pytest                          # Run tests  
uv run black app tests                 # Format code
uv run ruff check app                  # Lint code
uv run mypy app                        # Type checking
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Release Process

This package uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated versioning and publishing.

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features (bumps minor version)
- `fix:` - Bug fixes (bumps patch version)  
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `BREAKING CHANGE:` - Breaking changes (bumps major version)

Examples:
```bash
git commit -m "feat: add support for Python 3.12"
git commit -m "fix: correct uvicorn command in output"
git commit -m "docs: update installation instructions"
```

## License

MIT - see [LICENSE](LICENSE) for details