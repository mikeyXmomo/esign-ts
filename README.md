# esign-ts

A comprehensive TypeScript SDK for Indonesian e-signature services, providing type-safe validation schemas and client implementations for both API v1 and v2.

## Features

- 🔒 **Type-safe** - Full TypeScript support with comprehensive type definitions
- 📋 **Validation** - Built-in validation using Valibot schemas
- 🌐 **Dual API Support** - Compatible with both API v1 and v2
- 🎯 **Tree-shakeable** - Modular imports for optimized bundle sizes
- 🖥️ **Universal** - Works in both Node.js and browser environments
- 📦 **Lightweight** - Optimized bundle size with selective imports

## Installation

```bash
npm install esign-ts
```

## Quick Start

### Basic Client Setup

```typescript
import { EsignClient } from "esign-ts";

const client = new EsignClient({
  baseURL: "https://api.esign.service.com",
  username: "your-username",
  password: "your-password",
  timeout: 30000, // optional, defaults to 30s
});
```

### API v1 - Sign PDF

```typescript
// Sign a PDF document
const signResponse = await client.signPDFV1({
  file: pdfFile, // File object
  nik: "1234567890123456", // 16-digit NIK
  passphrase: "your-passphrase",
  tampilan: "visible", // or 'invisible'

  // Optional visible signature parameters
  page: 1,
  xAxis: 100,
  yAxis: 200,
  width: 150,
  height: 75,
  reason: "Document approval",
  location: "Jakarta",
});

// Download signed document
const downloadResponse = await client.downloadDocumentV1({
  idDokumen: "document-id",
});

// Verify PDF signature
const verifyResponse = await client.verifyPDFV1({
  signed_file: signedPdfFile,
});
```

### API v2 - Advanced Features

```typescript
// Sign PDF with base64 content
const signResponse = await client.signPDFV2({
  nik: "1234567890123456", // Either NIK or email required
  passphrase: "your-passphrase", // Either passphrase or TOTP required
  signatureProperties: [
    {
      tampilan: "VISIBLE",
      page: 1,
      originX: 100,
      originY: 200,
      width: 150,
      height: 75,
      location: "Jakarta",
      reason: "Document approval",
    },
  ],
  file: ["base64-encoded-pdf-content"],
});

// Check user certificate status
const statusResponse = await client.checkUserStatus({
  nik: "1234567890123456",
});

// Register new user
const registerResponse = await client.registerUser({
  nama: "John Doe",
  email: "john@example.com",
});
```

### Browser Utilities

```typescript
import { BrowserUtils } from "esign-ts";

// Convert File to base64
const base64 = await BrowserUtils.fileToBase64(file);

// Convert base64 to Blob
const blob = BrowserUtils.base64ToBlob(base64, "application/pdf");

// Download blob as file
BrowserUtils.downloadBlob(blob, "signed-document.pdf");
```

### Validation Helpers

```typescript
import { validateNIK, validateEmail, validateBase64 } from "esign-ts";

// Validate Indonesian NIK
if (validateNIK("1234567890123456")) {
  console.log("Valid NIK");
}

// Validate email format
if (validateEmail("user@example.com")) {
  console.log("Valid email");
}

// Validate base64 string
if (validateBase64("SGVsbG8gV29ybGQ=")) {
  console.log("Valid base64");
}
```

## Modular Imports (Tree-shaking)

For optimal bundle sizes, import only what you need:

```typescript
// Full library
import { EsignClient } from "esign-ts";

// Only client functionality
import { EsignClient } from "esign-ts/client";

// Only validation schemas
import { NIKSchema, EmailSchema } from "esign-ts/schemas";

// Only TypeScript types
import type { SignPDFV1Request } from "esign-ts/types";

// Only utilities
import { validateNIK, BrowserUtils } from "esign-ts/utils";
```

## Configuration Options

### EsignClientConfig

```typescript
interface EsignClientConfig {
  baseURL: string; // API base URL
  username: string; // Authentication username
  password: string; // Authentication password
  timeout?: number; // Request timeout in milliseconds (default: 30000)
}
```

## API Reference

### API v1 Methods

| Method                 | Description              | Parameters                  |
| ---------------------- | ------------------------ | --------------------------- |
| `signPDFV1()`          | Sign PDF document        | `SignPDFV1Request`          |
| `downloadDocumentV1()` | Download signed document | `DownloadDocumentV1Request` |
| `verifyPDFV1()`        | Verify PDF signature     | `VerifyPDFV1Request`        |

### API v2 Methods

| Method                | Description                   | Parameters                 |
| --------------------- | ----------------------------- | -------------------------- |
| `signPDFV2()`         | Sign PDF with base64 content  | `SignPDFV2Request`         |
| `requestSignTOTPV2()` | Request TOTP for signing      | `RequestSignTOTPV2Request` |
| `checkUserStatus()`   | Check user certificate status | `CheckUserStatusRequest`   |
| `registerUser()`      | Register new user             | `UserRegistrationRequest`  |
| `verifyPDFV2()`       | Verify PDF signature (v2)     | `VerifyPDFV2Request`       |

### Seal/Stamp Methods

| Method                        | Description                  | Parameters                  |
| ----------------------------- | ---------------------------- | --------------------------- |
| `requestSealActivationTOTP()` | Request seal activation TOTP | `SealActivationTOTPRequest` |
| `revokeSealActivation()`      | Revoke seal activation       | `SealActivationTOTPRequest` |
| `requestSealOTP()`            | Request seal OTP             | `RequestSealOTPRequest`     |
| `sealPDF()`                   | Apply digital seal to PDF    | `SealPDFRequest`            |

## Error Handling

The client throws errors for various scenarios:

```typescript
try {
  const response = await client.signPDFV1(request);
} catch (error) {
  if (error.message.includes("HTTP error")) {
    console.error("API request failed:", error.message);
  } else if (error.message.includes("Either NIK or Email must be provided")) {
    console.error("Validation error:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## Validation Schemas

All request data is validated using Valibot schemas:

```typescript
import { NIKSchema, EmailSchema, SignPDFV1Schema } from "esign-ts/schemas";
import { parse } from "valibot";

// Manual validation
try {
  const validatedData = parse(SignPDFV1Schema, requestData);
} catch (error) {
  console.error("Validation failed:", error.message);
}
```

## Types

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  EsignClientConfig,
  SignPDFV1Request,
  SignPDFV2Request,
  VerifyPDFResponse,
  UserStatus,
  APIResponse,
} from "esign-ts";
```

## Bundle Size

The library is optimized for minimal bundle impact:

- **Full library**: ~5.6kB (2.1kB gzipped)
- **Client only**: ~4.2kB (1.5kB gzipped)
- **Schemas only**: ~1.8kB (0.8kB gzipped)
- **Utils only**: ~5.2kB (2.0kB gzipped)

## Browser Compatibility

- Modern browsers (ES2020+)
- Node.js 16+
- TypeScript 4.5+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:

- Open an issue on GitHub
- Check the [API Documentation](./API.md) for detailed examples
- Review the TypeScript types for parameter requirements
