# esign-ts

TypeScript SDK for Indonesian e-signature services.

## Install
```bash
npm install esign-ts
```

## Usage
```typescript
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
```

## Documentation
[Full Documentation](https://github.com/mikeyxmomo/esign-ts)

## License
MIT © [mikeyxmomo](https://github.com/mikeyxmomo)
