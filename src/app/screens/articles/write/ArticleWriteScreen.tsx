import { Stack, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import Editor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArticleModel, CategoryCode } from "@models";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "@components";
import { fileRepository } from "@repositories";
import { useRef } from "react";
import { useMutation } from "@libs/query";

const validationSchema = yup.object({
  title: yup.string().required(),
  categoryCode: yup.string().required(),
  content: yup.string().required(),
});

function ArticleWriteScreen() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  const editorRef = useRef<Editor | null>(null);
  // form hooks
  const {
    register,
    getValues,
    control,
    formState: { errors },
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
  const [upload, { isLoading }] = useMutation(fileRepository.upload);
  // calculated values
  // effects
  // handlers
  const handleUploadFiles = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (file) {
        const res = await upload({ file });
        const imgUrl = res.publicUrl;
        const editor = editorRef.current!.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range!.index, "image", imgUrl);
        editor.setSelection(range!);
      }
    });
  };

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
              ref={editorRef}
              modules={{
                toolbar: {
                  container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ align: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }, "link"],
                    [
                      {
                        color: [
                          "#000000",
                          "#e60000",
                          "#ff9900",
                          "#ffff00",
                          "#008a00",
                          "#0066cc",
                          "#9933ff",
                          "#ffffff",
                          "#facccc",
                          "#ffebcc",
                          "#ffffcc",
                          "#cce8cc",
                          "#cce0f5",
                          "#ebd6ff",
                          "#bbbbbb",
                          "#f06666",
                          "#ffc266",
                          "#ffff66",
                          "#66b966",
                          "#66a3e0",
                          "#c285ff",
                          "#888888",
                          "#a10000",
                          "#b26b00",
                          "#b2b200",
                          "#006100",
                          "#0047b2",
                          "#6b24b2",
                          "#444444",
                          "#5c0000",
                          "#663d00",
                          "#666600",
                          "#003700",
                          "#002966",
                          "#3d1466",
                          "custom-color",
                        ],
                      },
                      { background: [] },
                    ],
                    ["image", "video"],
                    ["clean"],
                  ],
                  handlers: { image: handleUploadFiles },
                },
              }}
              value={value}
              onChange={onChange}
              style={{
                height: "300px",
              }}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}

export { ArticleWriteScreen };
