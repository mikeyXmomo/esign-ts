import * as v from "valibot";
import { NIKSchema, EmailSchema, Base64Schema } from "../schemas/common";

// Common types derived from validation schemas
export type NIK = v.InferInput<typeof NIKSchema>;
export type Email = v.InferInput<typeof EmailSchema>;
export type Base64String = v.InferInput<typeof Base64Schema>;

// User status enum
export type UserStatus =
  | "ISSUE"
  | "EXPIRED"
  | "RENEW"
  | "WAITING_FOR_VERIFICATION"
  | "NEW"
  | "NO_CERTIFICATE"
  | "NOT_REGISTERED"
  | "SUSPEND"
  | "REVOKE";

// Common response interfaces
export interface APIResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
}

export interface VerifyPDFResponse {
  nama_dokumen: string;
  jumlah_signature: number;
  notes: string;
  details: SignatureDetail[];
  summary: string;
}

export interface SignatureDetail {
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
