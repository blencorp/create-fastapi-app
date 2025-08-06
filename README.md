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
make run
```

Your API will be running at http://localhost:8000

- API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Available Commands

```bash
make run        # Start dev server
make test       # Run tests
make lint       # Check code
make format     # Format code
make typecheck  # Type checking
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT - see [LICENSE](LICENSE) for details