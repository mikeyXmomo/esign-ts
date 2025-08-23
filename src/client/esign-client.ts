import { parse } from "valibot";
import type { EsignClientConfig } from "./config";

// Schema imports
import {
  SignPDFV1Schema,
  DownloadDocumentV1Schema,
  VerifyPDFV1Schema,
} from "../schemas/v1";
import {
  SignPDFV2Schema,
  RequestSignTOTPV2Schema,
  SealActivationTOTPSchema,
  RequestSealOTPSchema,
  SealPDFSchema,
  CheckUserStatusSchema,
  UserRegistrationSchema,
  VerifyPDFV2Schema,
} from "../schemas/v2";

// Type imports
import type {
  SignPDFV1Request,
  DownloadDocumentV1Request,
  VerifyPDFV1Request,
} from "../types/v1";
import type {
  SignPDFV2Request,
  RequestSignTOTPV2Request,
  SealActivationTOTPRequest,
  RequestSealOTPRequest,
  SealPDFRequest,
  CheckUserStatusRequest,
  UserRegistrationRequest,
  VerifyPDFV2Request,
} from "../types/v2";
import type {
  APIResponse,
  VerifyPDFResponse,
  UserStatus,
} from "../types/common";

export class EsignClient {
  private config: EsignClientConfig;
  private authHeader: string;

  constructor(config: EsignClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
    this.authHeader = "Basic " + btoa(`${config.username}:${config.password}`);
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" = "POST",
    data?: any,
    isFormData = false
  ): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      Authorization: this.authHeader,
    };

    let body: any = data;

    if (data && !isFormData) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        return await response.json();
      } else {
        // For file downloads, return the response object
        return response as T;
      }
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // ===== API VERSION 1 METHODS =====

  async signPDFV1(request: SignPDFV1Request): Promise<Response> {
    const validatedRequest = parse(SignPDFV1Schema, request);

    const formData = new FormData();
    formData.append("file", validatedRequest.file);
    formData.append("nik", validatedRequest.nik);
    formData.append("passphrase", validatedRequest.passphrase);
    formData.append("tampilan", validatedRequest.tampilan);

    if (validatedRequest.imageTTD)
      formData.append("imageTTD", validatedRequest.imageTTD);
    if (validatedRequest.linkQR)
      formData.append("linkQR", validatedRequest.linkQR);
    if (validatedRequest.page !== undefined)
      formData.append("page", validatedRequest.page.toString());
    if (validatedRequest.image !== undefined)
      formData.append("image", validatedRequest.image.toString());
    if (validatedRequest.tag_koordinat)
      formData.append("tag_koordinat", validatedRequest.tag_koordinat);
    if (validatedRequest.xAxis !== undefined)
      formData.append("xAxis", validatedRequest.xAxis.toString());
    if (validatedRequest.yAxis !== undefined)
      formData.append("yAxis", validatedRequest.yAxis.toString());
    if (validatedRequest.width !== undefined)
      formData.append("width", validatedRequest.width.toString());
    if (validatedRequest.height !== undefined)
      formData.append("height", validatedRequest.height.toString());
    if (validatedRequest.reason)
      formData.append("reason", validatedRequest.reason);
    if (validatedRequest.location)
      formData.append("location", validatedRequest.location);
    if (validatedRequest.text) formData.append("text", validatedRequest.text);

    return this.request<Response>("/api/sign/pdf", "POST", formData, true);
  }

  async downloadDocumentV1(
    request: DownloadDocumentV1Request
  ): Promise<Response> {
    const validatedRequest = parse(DownloadDocumentV1Schema, request);
    return this.request<Response>(
      `/api/sign/download/${validatedRequest.idDokumen}`,
      "GET"
    );
  }

  async verifyPDFV1(request: VerifyPDFV1Request): Promise<VerifyPDFResponse> {
    const validatedRequest = parse(VerifyPDFV1Schema, request);

    const formData = new FormData();
    formData.append("signed_file", validatedRequest.signed_file);

    return this.request<VerifyPDFResponse>(
      "/api/sign/verify",
      "POST",
      formData,
      true
    );
  }

  // ===== API VERSION 2 METHODS =====

  async signPDFV2(request: SignPDFV2Request): Promise<APIResponse> {
    // Custom validation to ensure either nik or email is provided
    if (!request.nik && !request.email) {
      throw new Error("Either NIK or Email must be provided");
    }

    // Custom validation to ensure either passphrase or totp is provided
    if (!request.passphrase && !request.totp) {
      throw new Error("Either passphrase or TOTP must be provided");
    }

    const validatedRequest = parse(SignPDFV2Schema, request);
    return this.request<APIResponse>(
      "/api/v2/sign/pdf",
      "POST",
      validatedRequest
    );
  }

  async requestSignTOTPV2(
    request: RequestSignTOTPV2Request
  ): Promise<APIResponse> {
    if (!request.nik && !request.email) {
      throw new Error("Either NIK or Email must be provided");
    }

    const validatedRequest = parse(RequestSignTOTPV2Schema, request);
    return this.request<APIResponse>(
      "/api/v2/sign/get/totp",
      "POST",
      validatedRequest
    );
  }

  async requestSealActivationTOTP(
    request: SealActivationTOTPRequest
  ): Promise<APIResponse> {
    const validatedRequest = parse(SealActivationTOTPSchema, request);
    return this.request<APIResponse>(
      "/api/v2/seal/get/activation",
      "POST",
      validatedRequest
    );
  }

  async revokeSealActivation(
    request: SealActivationTOTPRequest
  ): Promise<APIResponse> {
    const validatedRequest = parse(SealActivationTOTPSchema, request);
    return this.request<APIResponse>(
      "/api/v2/seal/revoke/activation",
      "POST",
      validatedRequest
    );
  }

  async requestSealOTP(request: RequestSealOTPRequest): Promise<APIResponse> {
    const validatedRequest = parse(RequestSealOTPSchema, request);
    return this.request<APIResponse>(
      "/api/v2/seal/get/totp",
      "POST",
      validatedRequest
    );
  }

  async sealPDF(request: SealPDFRequest): Promise<APIResponse> {
    const validatedRequest = parse(SealPDFSchema, request);
    return this.request<APIResponse>(
      "/api/v2/seal/pdf",
      "POST",
      validatedRequest
    );
  }

  async checkUserStatus(
    request: CheckUserStatusRequest
  ): Promise<APIResponse<{ status: UserStatus }>> {
    if (!request.nik && !request.email) {
      throw new Error("Either NIK or Email must be provided");
    }

    const validatedRequest = parse(CheckUserStatusSchema, request);
    return this.request<APIResponse<{ status: UserStatus }>>(
      "/api/v2/user/check/status",
      "POST",
      validatedRequest
    );
  }

  async registerUser(request: UserRegistrationRequest): Promise<APIResponse> {
    const validatedRequest = parse(UserRegistrationSchema, request);
    return this.request<APIResponse>(
      "/api/v2/user/registration",
      "POST",
      validatedRequest
    );
  }

  async verifyPDFV2(request: VerifyPDFV2Request): Promise<VerifyPDFResponse> {
    const validatedRequest = parse(VerifyPDFV2Schema, request);
    return this.request<VerifyPDFResponse>(
      "/api/v2/verify/pdf",
      "POST",
      validatedRequest
    );
  }
}
