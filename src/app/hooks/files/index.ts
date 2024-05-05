import { useMutation } from "@libs/query";
import { useCallback, useState } from "react";

function useUploader(
  upload: (data: {
    file: File;
  }) => Promise<{ id: string; name: string; publicUrl: string }>,
  options: {
    uploadPath?: string;
    maxTotalFileSizes?: number;
    onCompleted?: (result: {
      id: string;
      name: string;
      publicUrl: string;
    }) => void;
    onError?: (error: Error) => void;
  }
) {
  // prop destruction
  const {
    uploadPath,
    maxTotalFileSizes = 100 * 1024 * 1024,
    onCompleted,
    onError,
  } = options;
  // lib hooks
  const [error, setError] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; id: string; size: number; publicUrl: string }[]
  >([]);

  console.log("!@#,uploadedFiles", uploadedFiles);
  // state, ref hooks
  // form hooks
  // query hooks
  const [uploadFile, { isLoading }] = useMutation(upload, {
    onCompleted,
    onError,
  });
  // calculated values
  // effects
  // handlers

  return {
    upload: useCallback(
      async ({ file }: { file: File }) => {
        const totalFileSize =
          file.size + uploadedFiles.reduce((prev, file) => prev + file.size, 0);
        if (totalFileSize > maxTotalFileSizes) {
          setError(true);
        } else {
          return uploadFile(
            { file },
            {
              onSuccess: (result) => {
                setUploadedFiles((prev) => [
                  // NOTE: 파일 이름 중복되면 덮어씌운다.
                  ...prev.filter(
                    (uploadedFile) => uploadedFile.name !== result.name
                  ),
                  {
                    id: result.id,
                    name: result.name,
                    size: file.size,
                    publicUrl: result.publicUrl,
                  },
                ]);
              },
            }
          );
        }
      },
      [maxTotalFileSizes, uploadPath, uploadFile, uploadedFiles]
    ),
    cancel: useCallback((fileIds: string[]) => {
      const fileIdsSet = fileIds.reduce(
        (prev, fileId) => {
          prev[fileId] = true;
          return prev;
        },
        {} as Record<string, boolean>
      );

      setUploadedFiles((prev) => prev.filter((file) => !fileIdsSet[file.id]));
      setError(false);
    }, []),
    uploadedFiles,
    loading: isLoading,
    setError,
    error,
  };
}

export { useUploader };
