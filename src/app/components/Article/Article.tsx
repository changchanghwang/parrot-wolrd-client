import { Divider, Stack, Typography } from "@mui/material";
import { ArticleModel } from "@models";
import { fileRepository } from "@repositories";
import { useQuery } from "@libs/query";
import Document from "@assets/images/document.svg";

function Article(props: { article: ArticleModel }) {
  // prop destruction
  const { article } = props;
  // lib hooks
  const { data: files } = useQuery(fileRepository.list, {
    variables: {
      ids: article.fileIds,
    },
  });
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Stack direction="column" spacing="8px" css={{ height: "64px" }}>
      <Stack key={article.id} direction="row" spacing="8px">
        {files?.length ? (
          <img
            src={files[0].publicUrl}
            alt="file"
            css={{ height: "56px", width: "56px" }}
          />
        ) : (
          <div css={{ padding: "8px", height: "56px", width: "56px" }}>
            <Document css={{ height: "100%", width: "100%" }} />
          </div>
        )}
        <Stack direction="column" spacing="8px">
          <Typography
            variant="body1"
            css={{ fontSize: "20px", fontWeight: 700 }}
          >
            {article.title}
          </Typography>
          <Stack direction="row" spacing="4px">
            <Typography
              variant="body2"
              css={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}
            >
              {article.author.nickName}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
}

export { Article };
