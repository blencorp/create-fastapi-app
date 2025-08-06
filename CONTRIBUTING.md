# Contributing to create-fastapi-app

Thanks for your interest in contributing! We welcome contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/create-fastapi-app.git
   cd create-fastapi-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

Test your changes locally:
```bash
node index.js test-project
```

## Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test them

3. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```

## Commit Convention

We use conventional commits. Please format your commit messages as:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Pull Request Process

1. Ensure your code works with the latest version
2. Update the README.md if needed
3. Submit a pull request with a clear description of changes

## Code Style

- Use ES modules (import/export)
- Keep it simple - this is a scaffolding tool
- Test your changes with different project names
- Ensure the generated FastAPI project runs correctly

## Testing Checklist

Before submitting a PR, ensure:
- [ ] The CLI runs without errors
- [ ] Generated project structure is correct
- [ ] `make run` works in the generated project
- [ ] `make test` passes in the generated project
- [ ] No hardcoded paths or user-specific data

## Questions?

Feel free to open an issue for any questions or suggestions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.