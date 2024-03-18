import { VerificationType } from "@models";
import { httpClient } from "@libs/http-client";
import { queryKeyMap } from "@libs/query";

export const verificationRepository = {
  async verifyEmail(params: { email: string; type: VerificationType }) {
    return httpClient.post<{ id: number }>("/verifications/email", params);
  },
};

queryKeyMap.set(verificationRepository.verifyEmail, ["Verification"]);
