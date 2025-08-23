# Publishing to npm

This guide explains how to publish the esign-ts package to npm.

## Prerequisites

### 1. npm Account Setup

1. **Create npm account**: Go to [npmjs.com](https://www.npmjs.com/signup)
2. **Verify email**: Check your email and verify your account
3. **Enable 2FA**: Highly recommended for security

### 2. Local Setup

1. **Login to npm**:
   ```bash
   npm login
   ```
   Enter your npm username, password, and 2FA code when prompted.

2. **Verify login**:
   ```bash
   npm whoami
   ```
   Should display your npm username.

## Manual Publishing

### Quick Release Commands

```bash
# Patch release (1.0.0 → 1.0.1) - Bug fixes
npm run release:patch

# Minor release (1.0.0 → 1.1.0) - New features
npm run release:minor

# Major release (1.0.0 → 2.0.0) - Breaking changes
npm run release:major
```

### Manual Step-by-Step

1. **Ensure everything is committed**:
   ```bash
   git status
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Build the package**:
   ```bash
   npm run build
   ```

4. **Update version**:
   ```bash
   # Choose one:
   npm version patch    # 1.0.0 → 1.0.1
   npm version minor    # 1.0.0 → 1.1.0
   npm version major    # 1.0.0 → 2.0.0
   ```

5. **Preview package contents**:
   ```bash
   npm pack --dry-run
   ```

6. **Publish to npm**:
   ```bash
   npm publish
   ```

7. **Push tags to GitHub**:
   ```bash
   git push --follow-tags
   ```

## Automated Publishing (Recommended)

### GitHub Actions Setup

1. **Generate npm token**:
   - Go to [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
   - Click "Generate New Token" → "Automation"
   - Copy the token

2. **Add token to GitHub**:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm token
   - Click "Add secret"

3. **Release using tags**:
   ```bash
   # Create and push a version tag
   git tag v1.0.0
   git push origin v1.0.0
   ```

   This will automatically:
   - Run all tests
   - Build the package
   - Publish to npm with provenance
   - Create GitHub release

### Automated Release Workflow

The project includes automated release workflow that:

- ✅ **Runs on version tags** (v1.0.0, v1.1.0, etc.)
- ✅ **Runs full test suite** before publishing
- ✅ **Builds optimized package**
- ✅ **Publishes with npm provenance** for supply chain security
- ✅ **Creates GitHub release** with artifacts
- ✅ **Handles pre-releases** (v1.0.0-alpha.1)

## Package Configuration

### Current Settings

```json
{
  "name": "esign-ts",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public"
  },
  "files": [
    "dist"
  ]
}
```

### What Gets Published

The package includes:
- ✅ `dist/index.js` - Main bundle (5.6kB)
- ✅ `dist/index.d.ts` - TypeScript definitions (15.7kB)
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - MIT license
- ✅ `package.json` - Package metadata

**Total package size**: ~7.9kB (32.5kB unpacked)

## Pre-publish Checklist

Before publishing, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Package builds successfully (`npm run build`)
- [ ] README.md is up to date
- [ ] CHANGELOG updated (if applicable)
- [ ] Version number is appropriate
- [ ] No sensitive information in code
- [ ] License is correct
- [ ] Keywords are relevant

## Version Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.x): Bug fixes, documentation updates
- **Minor** (1.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

## Post-publishing

After successful publish:

1. **Verify on npm**: Check [npmjs.com/package/esign-ts](https://www.npmjs.com/package/esign-ts)
2. **Test installation**: 
   ```bash
   npx esign-ts@latest
   npm info esign-ts
   ```
3. **Update documentation** if needed
4. **Announce release** in relevant channels

## Troubleshooting

### Common Issues

1. **Permission denied**:
   ```bash
   npm login
   npm whoami  # Verify login
   ```

2. **Package name taken**:
   - Change package name in `package.json`
   - Check availability: `npm view package-name`

3. **2FA issues**:
   - Ensure 2FA is configured correctly
   - Use automation tokens for CI/CD

4. **Build failures**:
   ```bash
   npm run clean
   npm run build
   ```

### Getting Help

- **npm docs**: [docs.npmjs.com](https://docs.npmjs.com)
- **GitHub Issues**: Report issues in the repository
- **npm support**: [npmjs.com/support](https://www.npmjs.com/support)

## Security

- ✅ **2FA enabled** on npm account
- ✅ **Automation tokens** for CI/CD
- ✅ **Provenance publishing** enabled
- ✅ **Dependency scanning** in CI
- ✅ **Supply chain security** with GitHub Actions

---

**Ready to publish!** 🚀

Use `npm run release:patch` for your first release.
