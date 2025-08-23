#!/usr/bin/env node

/**
 * Restore the full README after npm publishing
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const fullReadme = join(rootDir, 'README.md');
const backupReadme = join(rootDir, 'README.full.md');

console.log('🔄 Restoring full README...');

try {
  if (existsSync(backupReadme)) {
    const fullContent = readFileSync(backupReadme, 'utf8');
    writeFileSync(fullReadme, fullContent);
    unlinkSync(backupReadme); // Remove backup
    console.log('✅ Restored full README.md');
  } else {
    console.log('⚠️  No backup README found');
  }
} catch (error) {
  console.error('❌ Failed to restore README:', error.message);
  process.exit(1);
}
