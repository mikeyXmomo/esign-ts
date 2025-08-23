import { parse } from "valibot";
import { NIKSchema, EmailSchema, Base64Schema } from "../schemas/common";

// Validation helper functions
export const validateNIK = (nik: string): boolean => {
  try {
    parse(NIKSchema, nik);
    return true;
  } catch {
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  try {
    parse(EmailSchema, email);
    return true;
  } catch {
    return false;
  }
};

export const validateBase64 = (base64: string): boolean => {
  try {
    parse(Base64Schema, base64);
    return true;
  } catch {
    return false;
  }
};
