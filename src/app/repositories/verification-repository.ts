import { VerificationModel, VerificationType } from "@models";
import { httpClient } from "@libs/http-client";
import { queryKeyMap } from "@libs/query";

export const verificationRepository = {
  async verifyEmail(params: { to: string; type: VerificationType }) {
    return httpClient.post<VerificationModel>("/verifications/emails", params);
  },

  async verifyCode({ id, code }: { id: number; code: string }) {
    return httpClient.post(`/verifications/emails/${id}`, { code });
  },
};

queryKeyMap.set(verificationRepository.verifyEmail, ["Verification"]);
queryKeyMap.set(verificationRepository.verifyCode, ["Verification"]);
