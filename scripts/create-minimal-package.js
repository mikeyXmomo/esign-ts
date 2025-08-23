#!/usr/bin/env node

/**
 * Create a minimal package by directly replacing README content
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const readmePath = join(rootDir, 'README.md');

console.log('📦 Creating minimal package...');

// Minimal README content
const minimalReadme = `# esign-ts

TypeScript SDK for Indonesian e-signature services.

## Install
\`\`\`bash
npm install esign-ts
\`\`\`

## Usage
\`\`\`typescript
import { EsignClient } from 'esign-ts';

const client = new EsignClient({
  baseURL: 'https://api.esign.service.com',
  username: 'username',
  password: 'password',
});

// Sign PDF
await client.signPDFV1({
  file: pdfFile,
  nik: '1234567890123456',
  passphrase: 'passphrase',
  tampilan: 'visible',
});
\`\`\`

## Documentation
[Full Documentation](https://github.com/mikeyxmomo/esign-ts)

## License
MIT © [mikeyxmomo](https://github.com/mikeyxmomo)
`;

try {
  // Backup original
  const originalReadme = readFileSync(readmePath, 'utf8');
  writeFileSync(join(rootDir, 'README.full.md'), originalReadme);
  
  // Write minimal version
  writeFileSync(readmePath, minimalReadme);
  
  const originalSize = originalReadme.length;
  const newSize = minimalReadme.length;
  const reduction = originalSize - newSize;
  const percentage = ((reduction / originalSize) * 100).toFixed(1);
  
  console.log('✅ Created minimal README:');
  console.log(`   Original: ${originalSize} bytes`);
  console.log(`   Minimal: ${newSize} bytes`);
  console.log(`   Reduction: ${reduction} bytes (${percentage}%)`);
  
} catch (error) {
  console.error('❌ Failed to create minimal package:', error.message);
  process.exit(1);
}
