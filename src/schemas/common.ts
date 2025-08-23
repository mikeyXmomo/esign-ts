import { pipe, string, minLength, maxLength, regex, email } from "valibot";

// Common validation schemas used across different API versions
export const NIKSchema = pipe(
  string(),
  minLength(16),
  maxLength(16),
  regex(/^\d{16}$/, "NIK must be 16 digits")
);

export const EmailSchema = pipe(string(), email("Invalid email format"));

export const Base64Schema = pipe(
  string(),
  regex(/^[A-Za-z0-9+/]*={0,2}$/, "Invalid base64 format")
);
