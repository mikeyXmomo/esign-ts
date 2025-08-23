# Contributing to esign-ts

Thank you for your interest in contributing to esign-ts! 🎉

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 7.0.0
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/esign-ts.git
   cd esign-ts
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Available Scripts

- `npm run dev` - Start development mode with watch
- `npm run build` - Build the package
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run typecheck` - Check TypeScript types
- `npm run lint` - Lint and fix code
- `npm run format` - Format code with Prettier

### Making Changes

1. **Code Style**: Follow the existing code style. Use Prettier and ESLint.
2. **TypeScript**: Ensure full type safety - no `any` types unless absolutely necessary.
3. **Testing**: Add tests for new functionality and ensure existing tests pass.
4. **Documentation**: Update documentation for any API changes.

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or modifications
- `chore:` - Maintenance tasks

Examples:
```
feat: add support for batch PDF signing
fix: handle timeout errors gracefully
docs: update API examples in README
```

## Code Guidelines

### TypeScript

- Use strict type checking
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Testing

- Write unit tests for all new functionality
- Aim for >90% code coverage
- Use descriptive test names
- Test both success and error cases

### API Design

- Follow existing naming conventions
- Maintain backward compatibility when possible
- Use consistent parameter naming
- Provide clear error messages

## Pull Request Process

1. **Create Feature Branch**: Create a branch from `main`
2. **Make Changes**: Implement your changes following the guidelines
3. **Test**: Ensure all tests pass and add new tests if needed
4. **Document**: Update documentation if needed
5. **Submit PR**: Create a pull request with a clear description

### PR Requirements

- [ ] All tests pass
- [ ] Code is properly formatted
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] PR description is clear and complete

## Issue Guidelines

### Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Code sample that reproduces the issue
- Environment details (Node.js version, etc.)

### Feature Requests

For feature requests, please include:

- Clear description of the feature
- Use case and motivation
- Proposed API design (if applicable)
- Alternatives considered

## Project Structure

```
esign-ts/
├── src/
│   ├── client/          # EsignClient implementation
│   ├── schemas/         # Valibot validation schemas
│   │   ├── common.ts    # Shared schemas
│   │   ├── v1/          # API v1 schemas
│   │   └── v2/          # API v2 schemas
│   ├── types/           # TypeScript type definitions
│   │   ├── common.ts    # Shared types
│   │   ├── v1.ts        # API v1 types
│   │   └── v2.ts        # API v2 types
│   ├── utils/           # Utility functions
│   │   ├── validation.ts # Validation helpers
│   │   ├── browser.ts   # Browser-specific utilities
│   │   └── factory.ts   # Factory functions
│   └── index.ts         # Main entry point
├── tests/               # Test files
├── .github/             # GitHub templates and workflows
└── docs/                # Documentation
```

## Release Process

Releases are automated through GitHub Actions:

1. Update version using `npm run release:patch|minor|major`
2. Push tags to trigger release workflow
3. GitHub Actions will build, test, and publish to npm

## Code of Conduct

Please be respectful and inclusive in all interactions. We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).

## Getting Help

- 📖 Check the [documentation](../README.md)
- 🐛 Search [existing issues](https://github.com/mikeyxmomo/esign-ts/issues)
- ❓ Ask questions in [discussions](https://github.com/mikeyxmomo/esign-ts/discussions)
- 💬 Join our community channels

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Special mentions for major features

Thank you for helping make esign-ts better! 🚀
