import * as v from "valibot";
import {
  SignaturePropertiesSchema,
  SignPDFV2Schema,
  RequestSignTOTPV2Schema,
  SealActivationTOTPSchema,
  RequestSealOTPSchema,
  SealPDFSchema,
  CheckUserStatusSchema,
  UserRegistrationSchema,
  VerifyPDFV2Schema,
} from "../schemas/v2";

// API Version 2 Types
export type SignatureProperties = v.InferInput<
  typeof SignaturePropertiesSchema
>;
export type SignPDFV2Request = v.InferInput<typeof SignPDFV2Schema>;
export type RequestSignTOTPV2Request = v.InferInput<
  typeof RequestSignTOTPV2Schema
>;
export type SealActivationTOTPRequest = v.InferInput<
  typeof SealActivationTOTPSchema
>;
export type RequestSealOTPRequest = v.InferInput<typeof RequestSealOTPSchema>;
export type SealPDFRequest = v.InferInput<typeof SealPDFSchema>;
export type CheckUserStatusRequest = v.InferInput<typeof CheckUserStatusSchema>;
export type UserRegistrationRequest = v.InferInput<
  typeof UserRegistrationSchema
>;
export type VerifyPDFV2Request = v.InferInput<typeof VerifyPDFV2Schema>;
