import { httpClient } from "@libs/http-client";
import { queryKeyMap } from "@libs/query";

export const memberRepository = {
  async signIn({ email, password }: { email: string; password: string }) {
    return httpClient.post("/members/sign-in", {
      email,
      password,
    });
  },
};

queryKeyMap.set(memberRepository.signIn, ["Member"]);
