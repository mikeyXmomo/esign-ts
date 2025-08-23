import { EsignClient } from "../client/esign-client";
import type { EsignClientConfig } from "../client/config";

// Factory function for creating EsignClient instances
export const createEsignClient = (config: EsignClientConfig): EsignClient => {
  return new EsignClient(config);
};
