import { Stack, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import Editor, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArticleModel, CategoryCode } from "@models";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Select } from "@components";
import { articleRepository, fileRepository } from "@repositories";
import { useMemo, useRef } from "react";
import { useMutation } from "@libs/query";
import { useUploader } from "@hooks";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_ARTICLES } from "../../../routes";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

const validationSchema = yup.object({
  title: yup.string().required(),
  categoryCode: yup.mixed<CategoryCode>().required(),
  content: yup.string().required(),
});

function ArticleWriteScreen() {
  // prop destruction
  // lib hooks
  const { upload, uploadedFiles, cancel } = useUploader(
    fileRepository.upload,
    {}
  );
  const navigate = useNavigate();
  const location = useLocation();
  // state, ref hooks
  const editorRef = useRef<Editor | null>(null);
  // form hooks
  const {
    register,
    getValues,
    control,
    formState: { isValid },
    setValue,
    handleSubmit,
  } = useForm<yup.InferType<typeof validationSchema>>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      categoryCode: CategoryCode.FREE,
      content: "",
    },
  });
  // query hooks
  const [write, { isLoading: isWriting }] = useMutation(
    articleRepository.upload,
    {
      // onCompleted: () => {
      //   navigate(location.state.from ?? ROUTE_ARTICLES, { replace: true });
      // },
    }
  );
  // calculated values
  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image", "video"],
          ["clean"],
        ],
        imageResize: {
          parchment: Quill.import("parchment"),
        },
        handlers: {
          image: async () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.addEventListener("change", async () => {
              const file = input.files?.[0];
              if (file) {
                const res = await upload({ file });
                const imgUrl = res?.publicUrl;
                if (imgUrl) {
                  const editor = editorRef.current!.getEditor();
                  const range = editor.getSelection();
                  editor.insertEmbed(range!.index, "image", imgUrl);
                  editor.setSelection(range!);
                }
              }
            });
          },
        },
      },
    };
  }, []);
  // effects
  // handlers

  return (
    <Stack direction="column" spacing="32px">
      <Typography variant="h1" css={{ fontSize: "28px", fontWeight: 700 }}>
        글쓰기
      </Typography>
      <Stack direction="column" spacing="16px">
        <Controller
          control={control}
          name="categoryCode"
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              onChange={onChange}
              options={ArticleModel.getCategoryOptions()}
            />
          )}
        />
        <TextField
          placeholder="제목"
          {...register("title")}
          defaultValue={getValues("title")}
        />
        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => (
            <Editor
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "color",
                "background",
                "align",
                "link",
                "image",
                "video",
                "width",
                "height",
              ]}
              ref={editorRef}
              modules={modules}
              value={value}
              onChange={onChange}
              css={{
                ".ql-editor": {
                  height: "450px",
                },
              }}
            />
          )}
        />
      </Stack>
      <Stack direction="row" spacing="8px" justifyContent="flex-end">
        <Button
          variant="text"
          onClick={() =>
            navigate(location.state.from ?? ROUTE_ARTICLES, { replace: true })
          }
        >
          취소
        </Button>
        <Button
          variant="contained"
          loading={isWriting}
          disabled={!isValid}
          onClick={handleSubmit(async ({ title, categoryCode, content }) => {
            console.log("###", uploadedFiles);
            cancel(
              uploadedFiles
                .filter((file) => {
                  const regex = new RegExp(file.publicUrl, "g");
                  console.log("!!!", file.name, regex.test(content));
                  return regex.test(content);
                })
                .map((file) => file.id)
            );
            console.log("$$$", uploadedFiles);

            await write({
              title,
              categoryCode,
              content,
              fileIds: uploadedFiles.map((file) => file.id),
            });
          })}
        >
          작성
        </Button>
      </Stack>
    </Stack>
  );
}

export { ArticleWriteScreen };
