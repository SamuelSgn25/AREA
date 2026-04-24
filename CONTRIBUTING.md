# Contributing to AREA

First off, thank you for considering contributing to AREA! It's people like you that make AREA such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, Node version, etc.)

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and the expected behavior**
* **Explain why this enhancement would be useful**

### 🔌 Adding New Service Integrations

To add a new service:

1. Create a new file in `server/src/services/[service-name]/`
2. Implement the `IService` interface
3. Define Actions and REActions
4. Add OAuth configuration if needed
5. Write tests
6. Update documentation
7. Submit PR

Example structure:
```
server/src/services/
├── google/
│   ├── index.ts
│   ├── actions.ts
│   ├── reactions.ts
│   ├── oauth.ts
│   └── __tests__/
```

### 📝 Pull Requests

* Fill in the required template
* Follow the TypeScript style guide
* End all files with a newline
* Avoid platform-dependent code
* Write meaningful commit messages

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/AREA.git
cd AREA

# Add upstream remote
git remote add upstream https://github.com/samuelsgn/AREA.git

# Create a branch
git checkout -b feature/my-feature

# Install dependencies
npm install

# Create .env for development
cp .env.example .env

# Start development
npm run dev

# Run tests
npm run test
```

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🚀 `:rocket:` when improving performance
  - 🔥 `:fire:` when removing code or files
  - 🐛 `:bug:` when fixing a bug
  - ✨ `:sparkles:` when introducing new features
  - 📝 `:memo:` when writing docs
  - 🧪 `:test_tube:` when adding tests

### TypeScript Style Guide

* Use `const` by default, `let` when needed, avoid `var`
* Use strict typing (avoid `any`)
* Use meaningful variable names
* Add JSDoc comments for public functions
* Keep functions small and focused
* Maximum line length: 100 characters

Example:
```typescript
/**
 * Validates an email address
 * @param email - The email to validate
 * @returns True if valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

## Testing

* Write tests for all new features
* Maintain test coverage above 80%
* Tests should be in a `__tests__` directory next to the code
* Use descriptive test names

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Check coverage
npm run test:coverage
```

## Documentation

* Update README.md if you change functionality
* Add comments for complex logic
* Update API documentation for endpoint changes
* Include examples in your PRs

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested

## Questions?

Don't hesitate to reach out! You can:
* Open a GitHub issue
* Join our Discord community
* Email us at soglohounsamuel2@gmail.com

Thank you for your interest in contributing! 🎉
