#!/usr/bin/env node

/**
 * Prepare package for npm publishing by using compact README
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const fullReadme = join(rootDir, 'README.md');
const compactReadme = join(rootDir, 'README.npm.md');
const backupReadme = join(rootDir, 'README.full.md');

console.log('📦 Preparing package for npm...');

try {
  // Backup full README
  if (existsSync(fullReadme)) {
    const fullContent = readFileSync(fullReadme, 'utf8');
    writeFileSync(backupReadme, fullContent);
    console.log('✅ Backed up full README.md');
  }
  
  // Replace with compact README
  if (existsSync(compactReadme)) {
    const compactContent = readFileSync(compactReadme, 'utf8');
    writeFileSync(fullReadme, compactContent);
    
    const originalSize = readFileSync(backupReadme, 'utf8').length;
    const newSize = compactContent.length;
    const reduction = originalSize - newSize;
    const percentage = ((reduction / originalSize) * 100).toFixed(1);
    
    console.log('✅ Replaced README.md with compact version');
    console.log(`   Original: ${originalSize} bytes`);
    console.log(`   Compact: ${newSize} bytes`);
    console.log(`   Reduction: ${reduction} bytes (${percentage}%)`);
  } else {
    console.log('⚠️  README.npm.md not found, keeping original README.md');
  }
  
} catch (error) {
  console.error('❌ Failed to prepare npm package:', error.message);
  process.exit(1);
}
