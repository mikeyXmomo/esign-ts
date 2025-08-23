import {
  object,
  file,
  pipe,
  string,
  minLength,
  union,
  literal,
  optional,
  number,
  boolean,
} from "valibot";
import { NIKSchema } from "../common";

// API Version 1 Schemas
export const SignPDFV1Schema = object({
  file: file("PDF file is required"),
  nik: NIKSchema,
  passphrase: pipe(string(), minLength(1)),
  tampilan: union([literal("visible"), literal("invisible")]),

  // Optional parameters for visible signature
  imageTTD: optional(file()),
  linkQR: optional(string()),
  page: optional(number()),
  image: optional(boolean()),
  tag_koordinat: optional(string()),
  xAxis: optional(number()),
  yAxis: optional(number()),
  width: optional(number()),
  height: optional(number()),

  // Optional metadata
  reason: optional(string()),
  location: optional(string()),
  text: optional(string()),
});

export const DownloadDocumentV1Schema = object({
  idDokumen: pipe(string(), minLength(1)),
});

export const VerifyPDFV1Schema = object({
  signed_file: file("Signed PDF file is required"),
});
