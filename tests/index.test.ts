import { expect, test, describe } from "vitest";
import {
  EsignClient,
  createEsignClient,
  validateNIK,
  validateEmail,
  validateBase64,
  NIKSchema,
  EmailSchema,
  Base64Schema,
  BrowserUtils,
} from "../src";

describe("EsignClient", () => {
  test("should create client instance", () => {
    const client = new EsignClient({
      baseURL: "https://api.example.com",
      username: "test",
      password: "test",
    });
    expect(client).toBeInstanceOf(EsignClient);
  });

  test("should create client via factory function", () => {
    const client = createEsignClient({
      baseURL: "https://api.example.com",
      username: "test",
      password: "test",
    });
    expect(client).toBeInstanceOf(EsignClient);
  });
});

describe("Validation functions", () => {
  test("validateNIK should work correctly", () => {
    expect(validateNIK("1234567890123456")).toBe(true);
    expect(validateNIK("123456789012345")).toBe(false); // too short
    expect(validateNIK("12345678901234567")).toBe(false); // too long
    expect(validateNIK("123456789012345a")).toBe(false); // contains letter
  });

  test("validateEmail should work correctly", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("invalid-email")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });

  test("validateBase64 should work correctly", () => {
    expect(validateBase64("SGVsbG8gV29ybGQ=")).toBe(true);
    expect(validateBase64("SGVsbG8gV29ybGQ")).toBe(true);
    expect(validateBase64("invalid-base64!")).toBe(false);
  });
});

describe("Schemas export", () => {
  test("should export all schemas", () => {
    expect(NIKSchema).toBeDefined();
    expect(EmailSchema).toBeDefined();
    expect(Base64Schema).toBeDefined();
  });
});

describe("Browser utilities", () => {
  test("should export BrowserUtils", () => {
    expect(BrowserUtils).toBeDefined();
    expect(BrowserUtils.base64ToBlob).toBeDefined();
    expect(BrowserUtils.fileToBase64).toBeDefined();
    expect(BrowserUtils.downloadBlob).toBeDefined();
  });

  test("base64ToBlob should create blob", () => {
    const base64 = "SGVsbG8gV29ybGQ="; // "Hello World" in base64
    const blob = BrowserUtils.base64ToBlob(base64, "text/plain");
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("text/plain");
  });
});
