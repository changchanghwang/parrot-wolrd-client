import { stringify } from "qs";
import { httpClient } from "@libs/http-client";
import { queryKeyMap } from "@libs/query";

export const userRepository = {
  async signIn(params: { email: string; password: string }) {
    return httpClient.post("/users/sign-in", params);
  },

  async checkDuplicatedNickName(params: { nickName: string }) {
    return httpClient.get<{ isDuplicated: boolean }>(`/users/check`, {
      params,
      paramsSerializer: (params) => {
        return stringify(params, { arrayFormat: "repeat" });
      },
    });
  },

  async signUp(params: { email: string; nickName: string; password: string }) {
    return httpClient.post("/users/sign-up", params);
  },
};

queryKeyMap.set(userRepository.signIn, ["User"]);
queryKeyMap.set(userRepository.signUp, ["User"]);
queryKeyMap.set(userRepository.checkDuplicatedNickName, ["User"]);
