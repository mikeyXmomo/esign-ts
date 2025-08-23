#!/usr/bin/env node

/**
 * Post-build script to optimize TypeScript definitions
 * Reduces verbose Valibot schema types to simpler interfaces
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist', 'index.d.ts');

console.log('🔧 Optimizing TypeScript definitions...');

try {
  let content = readFileSync(distPath, 'utf8');
  
  // Replace verbose Valibot types with simpler generic types
  const optimizations = [
    // Replace complex schema types with generic Schema type
    {
      pattern: /valibot0\.SchemaWithPipe<readonly \[.*?\]>/g,
      replacement: 'valibot0.BaseSchema<string, string, valibot0.BaseIssue<unknown>>'
    },
    {
      pattern: /valibot0\.ObjectSchema<{[^}]*}, undefined>/g,
      replacement: 'valibot0.BaseSchema<Record<string, unknown>, Record<string, unknown>, valibot0.BaseIssue<unknown>>'
    },
    {
      pattern: /valibot0\.UnionSchema<\[.*?\], undefined>/g,
      replacement: 'valibot0.BaseSchema<string, string, valibot0.BaseIssue<unknown>>'
    },
    {
      pattern: /valibot0\.OptionalSchema<.*?, undefined>/g,
      replacement: 'valibot0.BaseSchema<unknown, unknown, valibot0.BaseIssue<unknown>> | undefined'
    },
    {
      pattern: /valibot0\.ArraySchema<.*?, undefined>/g,
      replacement: 'valibot0.BaseSchema<unknown[], unknown[], valibot0.BaseIssue<unknown>>'
    },
    {
      pattern: /valibot0\.(String|Number|Boolean|File)Schema<.*?>/g,
      replacement: 'valibot0.BaseSchema<$1, $1, valibot0.BaseIssue<unknown>>'
    },
    // Simplify readonly declarations
    {
      pattern: /readonly /g,
      replacement: ''
    },
    // Remove excessive undefined types
    {
      pattern: /, undefined>/g,
      replacement: '>'
    }
  ];
  
  let originalSize = content.length;
  
  optimizations.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });
  
  // Additional cleanup: remove excessive whitespace and newlines
  content = content
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove triple newlines
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/;\s*}/g, ';}') // Compact object endings
    .replace(/{\s*/g, '{') // Compact object starts
    .replace(/,\s*/g, ',') // Compact commas
    .trim();
  
  writeFileSync(distPath, content);
  
  let newSize = content.length;
  let reduction = originalSize - newSize;
  let percentage = ((reduction / originalSize) * 100).toFixed(1);
  
  console.log(`✅ Optimized TypeScript definitions:`);
  console.log(`   Original: ${originalSize} bytes`);
  console.log(`   Optimized: ${newSize} bytes`);
  console.log(`   Reduction: ${reduction} bytes (${percentage}%)`);
  
} catch (error) {
  console.error('❌ Failed to optimize types:', error.message);
  process.exit(1);
}
