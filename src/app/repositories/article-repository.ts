import { stringify } from "qs";
import { httpClient } from "@libs/http-client";
import { queryKeyMap } from "@libs/query";
import { ArticleModel, CategoryCode } from "@models";

export const articleRepository = {
  async list(params: {
    categoryCode: string;
    page: number;
    limit: number;
    search?: { key: string; value: string };
  }) {
    return httpClient.get<{ items: ArticleModel[]; count: number }>(
      "/articles",
      {
        params,
        paramsSerializer: (params) => {
          return stringify(params, { arrayFormat: "repeat" });
        },
      }
    );
  },

  async upload(data: {
    title: string;
    categoryCode: CategoryCode;
    content: string;
    fileIds: string[];
  }) {
    return httpClient.post("/articles", data);
  },
};

queryKeyMap.set(articleRepository.list, ["Article"]);
queryKeyMap.set(articleRepository.upload, ["Article"]);
