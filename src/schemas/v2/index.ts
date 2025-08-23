import {
  object,
  union,
  literal,
  optional,
  array,
  pipe,
  string,
  minLength,
  number,
  minValue,
} from "valibot";
import { NIKSchema, EmailSchema, Base64Schema } from "../common";

// Signature properties schema used in multiple V2 endpoints
export const SignaturePropertiesSchema = object({
  tampilan: union([literal("VISIBLE"), literal("INVISIBLE")]),
  imageBase64: optional(Base64Schema),
  page: optional(number()),
  originX: optional(number()),
  originY: optional(number()),
  width: optional(number()),
  height: optional(number()),
  location: optional(string()),
  reason: optional(string()),
  tag_koordinat: optional(string()),
  pdfPassword: optional(string()),
});

// API Version 2 Schemas
export const SignPDFV2Schema = object({
  // Identity (one required)
  nik: optional(NIKSchema),
  email: optional(EmailSchema),

  // Credential (one required)
  passphrase: optional(pipe(string(), minLength(1))),
  totp: optional(pipe(string(), minLength(1))),

  signatureProperties: array(SignaturePropertiesSchema),
  file: array(Base64Schema),

  // Optional for seal
  idSubscriber: optional(string()),
});

export const RequestSignTOTPV2Schema = object({
  nik: optional(NIKSchema),
  email: optional(EmailSchema),
  data: number(),
});

export const SealActivationTOTPSchema = object({
  idSubscriber: pipe(string(), minLength(1)),
  totp: optional(string()),
});

export const RequestSealOTPSchema = object({
  idSubscriber: pipe(string(), minLength(1)),
  data: pipe(number(), minValue(1)),
  totp: pipe(string(), minLength(1)),
});

export const SealPDFSchema = object({
  idSubscriber: pipe(string(), minLength(1)),
  totp: pipe(string(), minLength(1)),
  signatureProperties: array(SignaturePropertiesSchema),
  file: array(Base64Schema),
});

export const CheckUserStatusSchema = object({
  nik: optional(NIKSchema),
  email: optional(EmailSchema),
});

export const UserRegistrationSchema = object({
  nama: pipe(string(), minLength(1)),
  email: EmailSchema,
});

export const VerifyPDFV2Schema = object({
  file: Base64Schema,
  password: optional(string()),
});
