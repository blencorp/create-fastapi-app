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

- [uv](https://github.com/astral-sh/uv) - Python package manager
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

## License

MIT - see [LICENSE](LICENSE) for details