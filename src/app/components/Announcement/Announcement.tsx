import { Divider, Stack, Typography } from "@mui/material";
import { ArticleModel } from "@models";

function Announcement(props: { article: ArticleModel }) {
  // prop destruction
  const { article } = props;
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Stack
      direction="column"
      spacing="8px"
      css={{ height: "48px", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Typography variant="body1" css={{ fontSize: "16px", fontWeight: 700 }}>
        {article.title}
      </Typography>
      <Divider />
    </Stack>
  );
}

export { Announcement };
