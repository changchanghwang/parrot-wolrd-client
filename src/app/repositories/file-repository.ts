import { stringify } from "qs";
import { httpClient } from "@libs/http-client";
import { queryKeyMap } from "@libs/query";
import { FileModel } from "@models";

export const fileRepository = {
  async list(params: { ids: string[] }) {
    return httpClient.get<FileModel[]>("/files", {
      params,
      paramsSerializer: (params) => {
        return stringify(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => {
              if (Array.isArray(value) && !value.length) {
                return [key, [null]];
              }
              return [key, value];
            })
          ),
          { arrayFormat: "repeat" }
        );
      },
    });
  },

  async upload({ file }: { file: File }) {
    const data = new FormData();
    data.append("file", file, file.name);

    return httpClient.post<{ id: string; name: string; publicUrl: string }>(
      "/files",
      data,
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );
  },
};

queryKeyMap.set(fileRepository.list, ["File"]);
queryKeyMap.set(fileRepository.upload, ["File"]);
