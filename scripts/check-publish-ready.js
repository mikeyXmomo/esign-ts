#!/usr/bin/env node

/**
 * Script to check if the package is ready for publishing to npm
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Checking if esign-ts is ready for npm publishing...\n');

let hasErrors = false;

function error(message) {
  console.log(`❌ ${message}`);
  hasErrors = true;
}

function success(message) {
  console.log(`✅ ${message}`);
}

function warning(message) {
  console.log(`⚠️  ${message}`);
}

// Check package.json
try {
  const packagePath = join(rootDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  
  success('package.json exists and is valid JSON');
  
  // Check required fields
  if (!packageJson.name) error('Missing package name');
  else success(`Package name: ${packageJson.name}`);
  
  if (!packageJson.version) error('Missing version');
  else success(`Version: ${packageJson.version}`);
  
  if (!packageJson.description) error('Missing description');
  else success('Description provided');
  
  if (!packageJson.author) error('Missing author');
  else success(`Author: ${packageJson.author}`);
  
  if (!packageJson.license) error('Missing license');
  else success(`License: ${packageJson.license}`);
  
  if (!packageJson.repository) error('Missing repository field');
  else success('Repository field configured');
  
  if (!packageJson.keywords || packageJson.keywords.length === 0) {
    warning('No keywords specified (helps with discoverability)');
  } else {
    success(`Keywords: ${packageJson.keywords.length} specified`);
  }
  
  // Check files field
  if (!packageJson.files || packageJson.files.length === 0) {
    warning('No files field specified (will include all files)');
  } else {
    success(`Files field configured: ${packageJson.files.join(', ')}`);
  }
  
} catch (err) {
  error(`Failed to read package.json: ${err.message}`);
}

// Check if dist directory exists
if (existsSync(join(rootDir, 'dist'))) {
  success('dist/ directory exists');
  
  // Check for main files
  if (existsSync(join(rootDir, 'dist/index.js'))) {
    success('dist/index.js exists');
  } else {
    error('dist/index.js missing - run npm run build');
  }
  
  if (existsSync(join(rootDir, 'dist/index.d.ts'))) {
    success('dist/index.d.ts exists');
  } else {
    error('dist/index.d.ts missing - run npm run build');
  }
} else {
  error('dist/ directory missing - run npm run build');
}

// Check essential files
if (existsSync(join(rootDir, 'README.md'))) {
  success('README.md exists');
} else {
  error('README.md missing');
}

if (existsSync(join(rootDir, 'LICENSE'))) {
  success('LICENSE file exists');
} else {
  error('LICENSE file missing');
}

// Check npm login status
try {
  const npmUser = execSync('npm whoami', { encoding: 'utf8' }).trim();
  success(`Logged in to npm as: ${npmUser}`);
} catch (err) {
  warning('Not logged in to npm - run: npm login');
}

// Check git status
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    warning('Working directory has uncommitted changes');
  } else {
    success('Working directory is clean');
  }
} catch (err) {
  warning('Not in a git repository or git not available');
}

// Run tests
console.log('\n🧪 Running tests...');
try {
  execSync('npm test', { stdio: 'pipe' });
  success('All tests pass');
} catch (err) {
  error('Tests failing - fix before publishing');
}

// Check build
console.log('\n🔨 Checking build...');
try {
  execSync('npm run build', { stdio: 'pipe' });
  success('Build successful');
} catch (err) {
  error('Build failing - fix before publishing');
}

// Summary
console.log('\n📊 Summary:');
if (hasErrors) {
  console.log('❌ Package is NOT ready for publishing');
  console.log('   Please fix the errors above before publishing');
  process.exit(1);
} else {
  console.log('✅ Package is ready for publishing!');
  console.log('\n🚀 To publish:');
  console.log('   npm run release:patch  # For bug fixes');
  console.log('   npm run release:minor  # For new features');
  console.log('   npm run release:major  # For breaking changes');
  console.log('\n   Or manually:');
  console.log('   npm version patch && npm publish');
}
