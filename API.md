# API Documentation

Complete API reference for esign-ts library.

## Table of Contents

- [Client Configuration](#client-configuration)
- [API Version 1](#api-version-1)
- [API Version 2](#api-version-2)
- [Seal/Stamp Operations](#sealstamp-operations)
- [Validation Schemas](#validation-schemas)
- [Browser Utilities](#browser-utilities)
- [Type Definitions](#type-definitions)
- [Error Handling](#error-handling)

## Client Configuration

### EsignClient Constructor

```typescript
import { EsignClient } from 'esign-ts';

const client = new EsignClient(config: EsignClientConfig);
```

#### EsignClientConfig

| Property   | Type     | Required | Default | Description                     |
| ---------- | -------- | -------- | ------- | ------------------------------- |
| `baseURL`  | `string` | ✅       | -       | API base URL                    |
| `username` | `string` | ✅       | -       | Authentication username         |
| `password` | `string` | ✅       | -       | Authentication password         |
| `timeout`  | `number` | ❌       | `30000` | Request timeout in milliseconds |

**Example:**

```typescript
const client = new EsignClient({
  baseURL: "https://api.esign.service.com",
  username: "your-username",
  password: "your-password",
  timeout: 60000, // 60 seconds
});
```

## API Version 1

### signPDFV1()

Sign a PDF document using API v1.

```typescript
async signPDFV1(request: SignPDFV1Request): Promise<Response>
```

#### SignPDFV1Request

| Property        | Type                       | Required | Description                |
| --------------- | -------------------------- | -------- | -------------------------- |
| `file`          | `File`                     | ✅       | PDF file to sign           |
| `nik`           | `string`                   | ✅       | 16-digit Indonesian NIK    |
| `passphrase`    | `string`                   | ✅       | User passphrase            |
| `tampilan`      | `'visible' \| 'invisible'` | ✅       | Signature visibility       |
| `imageTTD`      | `File`                     | ❌       | Signature image file       |
| `linkQR`        | `string`                   | ❌       | QR code link               |
| `page`          | `number`                   | ❌       | Page number for signature  |
| `image`         | `boolean`                  | ❌       | Include image in signature |
| `tag_koordinat` | `string`                   | ❌       | Coordinate tag             |
| `xAxis`         | `number`                   | ❌       | X-axis position            |
| `yAxis`         | `number`                   | ❌       | Y-axis position            |
| `width`         | `number`                   | ❌       | Signature width            |
| `height`        | `number`                   | ❌       | Signature height           |
| `reason`        | `string`                   | ❌       | Signing reason             |
| `location`      | `string`                   | ❌       | Signing location           |
| `text`          | `string`                   | ❌       | Signature text             |

**Example:**

```typescript
const response = await client.signPDFV1({
  file: pdfFile,
  nik: "1234567890123456",
  passphrase: "mySecurePassword",
  tampilan: "visible",
  page: 1,
  xAxis: 100,
  yAxis: 200,
  width: 150,
  height: 75,
  reason: "Contract approval",
  location: "Jakarta, Indonesia",
});
```

### downloadDocumentV1()

Download a signed document.

```typescript
async downloadDocumentV1(request: DownloadDocumentV1Request): Promise<Response>
```

#### DownloadDocumentV1Request

| Property    | Type     | Required | Description             |
| ----------- | -------- | -------- | ----------------------- |
| `idDokumen` | `string` | ✅       | Document ID to download |

**Example:**

```typescript
const response = await client.downloadDocumentV1({
  idDokumen: "doc-12345",
});

// Convert response to blob for download
const blob = await response.blob();
```

### verifyPDFV1()

Verify a signed PDF document.

```typescript
async verifyPDFV1(request: VerifyPDFV1Request): Promise<VerifyPDFResponse>
```

#### VerifyPDFV1Request

| Property      | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| `signed_file` | `File` | ✅       | Signed PDF file to verify |

**Example:**

```typescript
const verification = await client.verifyPDFV1({
  signed_file: signedPdfFile,
});

console.log("Document:", verification.nama_dokumen);
console.log("Signatures:", verification.jumlah_signature);
console.log("Details:", verification.details);
```

## API Version 2

### signPDFV2()

Sign PDF documents using base64 content with API v2.

```typescript
async signPDFV2(request: SignPDFV2Request): Promise<APIResponse>
```

#### SignPDFV2Request

| Property              | Type                    | Required | Description                       |
| --------------------- | ----------------------- | -------- | --------------------------------- |
| `nik`                 | `string`                | ❌\*     | 16-digit Indonesian NIK           |
| `email`               | `string`                | ❌\*     | User email address                |
| `passphrase`          | `string`                | ❌\*\*   | User passphrase                   |
| `totp`                | `string`                | ❌\*\*   | TOTP code                         |
| `signatureProperties` | `SignatureProperties[]` | ✅       | Signature configuration array     |
| `file`                | `string[]`              | ✅       | Base64-encoded PDF files          |
| `idSubscriber`        | `string`                | ❌       | Subscriber ID for seal operations |

\*Either `nik` or `email` must be provided  
\*\*Either `passphrase` or `totp` must be provided

#### SignatureProperties

| Property        | Type                       | Required | Description                    |
| --------------- | -------------------------- | -------- | ------------------------------ |
| `tampilan`      | `'VISIBLE' \| 'INVISIBLE'` | ✅       | Signature visibility           |
| `imageBase64`   | `string`                   | ❌       | Base64-encoded signature image |
| `page`          | `number`                   | ❌       | Page number                    |
| `originX`       | `number`                   | ❌       | X-axis origin                  |
| `originY`       | `number`                   | ❌       | Y-axis origin                  |
| `width`         | `number`                   | ❌       | Signature width                |
| `height`        | `number`                   | ❌       | Signature height               |
| `location`      | `string`                   | ❌       | Signing location               |
| `reason`        | `string`                   | ❌       | Signing reason                 |
| `tag_koordinat` | `string`                   | ❌       | Coordinate tag                 |
| `pdfPassword`   | `string`                   | ❌       | PDF password if protected      |

**Example:**

```typescript
const response = await client.signPDFV2({
  nik: "1234567890123456",
  passphrase: "mySecurePassword",
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
```

### requestSignTOTPV2()

Request a TOTP code for signing operations.

```typescript
async requestSignTOTPV2(request: RequestSignTOTPV2Request): Promise<APIResponse>
```

#### RequestSignTOTPV2Request

| Property | Type     | Required | Description             |
| -------- | -------- | -------- | ----------------------- |
| `nik`    | `string` | ❌\*     | 16-digit Indonesian NIK |
| `email`  | `string` | ❌\*     | User email address      |
| `data`   | `number` | ✅       | Data parameter          |

\*Either `nik` or `email` must be provided

**Example:**

```typescript
const totpResponse = await client.requestSignTOTPV2({
  nik: "1234567890123456",
  data: 123456,
});
```

### checkUserStatus()

Check the certificate status of a user.

```typescript
async checkUserStatus(request: CheckUserStatusRequest): Promise<APIResponse<{ status: UserStatus }>>
```

#### CheckUserStatusRequest

| Property | Type     | Required | Description             |
| -------- | -------- | -------- | ----------------------- |
| `nik`    | `string` | ❌\*     | 16-digit Indonesian NIK |
| `email`  | `string` | ❌\*     | User email address      |

\*Either `nik` or `email` must be provided

#### UserStatus

Possible status values:

- `"ISSUE"` - Certificate issued
- `"EXPIRED"` - Certificate expired
- `"RENEW"` - Needs renewal
- `"WAITING_FOR_VERIFICATION"` - Pending verification
- `"NEW"` - New user
- `"NO_CERTIFICATE"` - No certificate found
- `"NOT_REGISTERED"` - User not registered
- `"SUSPEND"` - Certificate suspended
- `"REVOKE"` - Certificate revoked

**Example:**

```typescript
const statusResponse = await client.checkUserStatus({
  nik: "1234567890123456",
});

console.log("User status:", statusResponse.data?.status);
```

### registerUser()

Register a new user in the system.

```typescript
async registerUser(request: UserRegistrationRequest): Promise<APIResponse>
```

#### UserRegistrationRequest

| Property | Type     | Required | Description        |
| -------- | -------- | -------- | ------------------ |
| `nama`   | `string` | ✅       | User full name     |
| `email`  | `string` | ✅       | User email address |

**Example:**

```typescript
const registrationResponse = await client.registerUser({
  nama: "John Doe",
  email: "john.doe@example.com",
});
```

### verifyPDFV2()

Verify a PDF document using API v2.

```typescript
async verifyPDFV2(request: VerifyPDFV2Request): Promise<VerifyPDFResponse>
```

#### VerifyPDFV2Request

| Property   | Type     | Required | Description               |
| ---------- | -------- | -------- | ------------------------- |
| `file`     | `string` | ✅       | Base64-encoded PDF file   |
| `password` | `string` | ❌       | PDF password if protected |

**Example:**

```typescript
const verification = await client.verifyPDFV2({
  file: "base64-encoded-pdf-content",
  password: "pdf-password", // if PDF is password protected
});
```

## Seal/Stamp Operations

### requestSealActivationTOTP()

Request TOTP for seal activation.

```typescript
async requestSealActivationTOTP(request: SealActivationTOTPRequest): Promise<APIResponse>
```

#### SealActivationTOTPRequest

| Property       | Type     | Required | Description   |
| -------------- | -------- | -------- | ------------- |
| `idSubscriber` | `string` | ✅       | Subscriber ID |
| `totp`         | `string` | ❌       | TOTP code     |

### revokeSealActivation()

Revoke seal activation.

```typescript
async revokeSealActivation(request: SealActivationTOTPRequest): Promise<APIResponse>
```

### requestSealOTP()

Request OTP for seal operations.

```typescript
async requestSealOTP(request: RequestSealOTPRequest): Promise<APIResponse>
```

#### RequestSealOTPRequest

| Property       | Type     | Required | Description         |
| -------------- | -------- | -------- | ------------------- |
| `idSubscriber` | `string` | ✅       | Subscriber ID       |
| `data`         | `number` | ✅       | Data parameter (≥1) |
| `totp`         | `string` | ✅       | TOTP code           |

### sealPDF()

Apply digital seal to PDF documents.

```typescript
async sealPDF(request: SealPDFRequest): Promise<APIResponse>
```

#### SealPDFRequest

| Property              | Type                    | Required | Description              |
| --------------------- | ----------------------- | -------- | ------------------------ |
| `idSubscriber`        | `string`                | ✅       | Subscriber ID            |
| `totp`                | `string`                | ✅       | TOTP code                |
| `signatureProperties` | `SignatureProperties[]` | ✅       | Signature configuration  |
| `file`                | `string[]`              | ✅       | Base64-encoded PDF files |

## Validation Schemas

### Available Schemas

```typescript
import {
  NIKSchema,
  EmailSchema,
  Base64Schema,
  SignPDFV1Schema,
  SignPDFV2Schema,
  // ... other schemas
} from "esign-ts/schemas";
```

### Validation Functions

```typescript
import { validateNIK, validateEmail, validateBase64 } from "esign-ts/utils";

// Validate NIK (16 digits)
const isValidNIK = validateNIK("1234567890123456"); // boolean

// Validate email format
const isValidEmail = validateEmail("user@example.com"); // boolean

// Validate base64 string
const isValidBase64 = validateBase64("SGVsbG8gV29ybGQ="); // boolean
```

### Manual Validation

```typescript
import { parse } from "valibot";
import { SignPDFV1Schema } from "esign-ts/schemas";

try {
  const validatedData = parse(SignPDFV1Schema, requestData);
  // Data is valid, proceed with API call
} catch (error) {
  console.error("Validation failed:", error.issues);
}
```

## Browser Utilities

### BrowserUtils Class

```typescript
import { BrowserUtils } from "esign-ts/utils";
```

#### fileToBase64()

Convert a File object to base64 string.

```typescript
static async fileToBase64(file: File): Promise<string>
```

**Example:**

```typescript
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];
const base64 = await BrowserUtils.fileToBase64(file);
```

#### base64ToBlob()

Convert base64 string to Blob object.

```typescript
static base64ToBlob(base64: string, mimeType?: string): Blob
```

**Example:**

```typescript
const blob = BrowserUtils.base64ToBlob("SGVsbG8gV29ybGQ=", "application/pdf");
```

#### downloadBlob()

Trigger browser download of a Blob.

```typescript
static downloadBlob(blob: Blob, filename?: string): void
```

**Example:**

```typescript
const blob = new Blob(["content"], { type: "text/plain" });
BrowserUtils.downloadBlob(blob, "document.txt");
```

## Type Definitions

### Response Types

#### APIResponse<T>

```typescript
interface APIResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
}
```

#### VerifyPDFResponse

```typescript
interface VerifyPDFResponse {
  nama_dokumen: string;
  jumlah_signature: number;
  notes: string;
  details: SignatureDetail[];
  summary: string;
}
```

#### SignatureDetail

```typescript
interface SignatureDetail {
  info_tsa: {
    name: string;
    tsa_cert_validity: string | null;
  };
  signature_field: string;
  info_signer: {
    issuer_dn: string;
    signer_name: string;
    signer_cert_validity: string;
    signer_dn: string;
    cert_user_certified: boolean;
  };
  signature_document: {
    signed_using_tsa: boolean;
    reason: string;
    document_integrity: boolean;
    signature_value: string | null;
    signed_in: string;
    location: string | null;
    hash_value: string | null;
  };
}
```

### Common Types

```typescript
type NIK = string; // 16-digit string
type Email = string; // Valid email format
type Base64String = string; // Valid base64 format
```

## Error Handling

### Common Error Scenarios

```typescript
try {
  const response = await client.signPDFV1(request);
} catch (error) {
  if (error instanceof Error) {
    // Handle specific error types
    switch (true) {
      case error.message.includes("HTTP error! status: 400"):
        console.error("Bad request - check your parameters");
        break;
      case error.message.includes("HTTP error! status: 401"):
        console.error("Authentication failed - check credentials");
        break;
      case error.message.includes("HTTP error! status: 404"):
        console.error("Endpoint not found");
        break;
      case error.message.includes("Either NIK or Email must be provided"):
        console.error("Missing required identity parameter");
        break;
      case error.message.includes("Either passphrase or TOTP must be provided"):
        console.error("Missing required authentication parameter");
        break;
      case error.name === "AbortError":
        console.error("Request timeout");
        break;
      default:
        console.error("Unexpected error:", error.message);
    }
  }
}
```

### Validation Errors

Validation errors from Valibot include detailed information:

```typescript
import { ValiError } from "valibot";

try {
  // API call
} catch (error) {
  if (error instanceof ValiError) {
    console.error("Validation errors:");
    error.issues.forEach((issue) => {
      console.error(`- ${issue.path}: ${issue.message}`);
    });
  }
}
```

### Network and Timeout Errors

```typescript
const client = new EsignClient({
  // ... config
  timeout: 60000, // 60 seconds
});

try {
  const response = await client.signPDFV1(request);
} catch (error) {
  if (error.name === "AbortError") {
    console.error("Request timed out after 60 seconds");
  } else if (error.message.includes("fetch")) {
    console.error("Network error:", error.message);
  }
}
```

## Best Practices

1. **Always validate input data** before making API calls
2. **Handle errors gracefully** with appropriate user feedback
3. **Use appropriate timeouts** for your use case
4. **Implement retry logic** for transient failures
5. **Use modular imports** for optimal bundle sizes
6. **Store credentials securely** - never expose in client-side code
7. **Validate file types and sizes** before processing
8. **Use HTTPS** for all API communications
