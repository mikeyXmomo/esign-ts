// ===== SCHEMA EXPORTS =====
export { NIKSchema, EmailSchema, Base64Schema } from "./schemas/common";

export {
  SignPDFV1Schema,
  DownloadDocumentV1Schema,
  VerifyPDFV1Schema,
} from "./schemas/v1";

export {
  SignaturePropertiesSchema,
  SignPDFV2Schema,
  RequestSignTOTPV2Schema,
  SealActivationTOTPSchema,
  RequestSealOTPSchema,
  SealPDFSchema,
  CheckUserStatusSchema,
  UserRegistrationSchema,
  VerifyPDFV2Schema,
} from "./schemas/v2";

// ===== TYPE EXPORTS =====
export type {
  NIK,
  Email,
  Base64String,
  UserStatus,
  APIResponse,
  VerifyPDFResponse,
  SignatureDetail,
} from "./types/common";

export type {
  SignPDFV1Request,
  DownloadDocumentV1Request,
  VerifyPDFV1Request,
} from "./types/v1";

export type {
  SignatureProperties,
  SignPDFV2Request,
  RequestSignTOTPV2Request,
  SealActivationTOTPRequest,
  RequestSealOTPRequest,
  SealPDFRequest,
  CheckUserStatusRequest,
  UserRegistrationRequest,
  VerifyPDFV2Request,
} from "./types/v2";

// ===== CLIENT EXPORTS =====
export type { EsignClientConfig } from "./client/config";
export { EsignClient } from "./client/esign-client";

// ===== UTILITY EXPORTS =====
export { validateNIK, validateEmail, validateBase64 } from "./utils/validation";

export { createEsignClient } from "./utils/factory";
export { BrowserUtils } from "./utils/browser";

// ===== DEFAULT EXPORT =====
export { EsignClient as default } from "./client/esign-client";
