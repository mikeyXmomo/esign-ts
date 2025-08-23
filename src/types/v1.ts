import * as v from "valibot";
import {
  SignPDFV1Schema,
  DownloadDocumentV1Schema,
  VerifyPDFV1Schema,
} from "../schemas/v1";

// API Version 1 Types
export type SignPDFV1Request = v.InferInput<typeof SignPDFV1Schema>;
export type DownloadDocumentV1Request = v.InferInput<
  typeof DownloadDocumentV1Schema
>;
export type VerifyPDFV1Request = v.InferInput<typeof VerifyPDFV1Schema>;
