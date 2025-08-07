# create-fastapi-app

Scaffold a FastAPI project with modern tooling in seconds.

```bash
npx @blen/create-fastapi-app my-api
```

## What you get

- FastAPI with uvicorn
- Modern Python packaging with `uv`
- Testing setup (pytest)
- Linting & formatting (ruff, black)
- Type checking (mypy)
- Environment configuration (.env)

## Requirements

- [uv](https://github.com/astral-sh/uv) - Fast Python package manager
- Node.js 14+

## Usage

```bash
# npm
npx @blen/create-fastapi-app my-api

# bun
bunx @blen/create-fastapi-app my-api

# pnpm
pnpm create @blen/fastapi-app my-api
```

Then:
```bash
cd my-api
uv run fastapi dev
```

Your API is now running at http://localhost:8000

## License

MIT