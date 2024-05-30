import { useLocation } from "react-router-dom";
import { useQuery } from "@libs/query";
import { articleRepository } from "../../../repositories";
import { Stack, Typography } from "@mui/material";
import ArrowIcon from "@assets/images/icons/icon-arrow-left.svg";

function ArticleDetailScreen() {
  // prop destruction
  // lib hooks
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const id = queryString.get("id")!;
  // state, ref hooks
  // form hooks
  // query hooks
  const { data: article } = useQuery(articleRepository.retrieve, {
    variables: {
      id,
    },
    suspense: true,
  });
  // calculated values
  // effects
  // handlers
  return (
    <Stack>
      <Stack direction="row" spacing="4px">
        <Typography variant="h5" css={{ fontWeight: "bold" }}>
          {article!.getCategoryLabel()}
        </Typography>
        <ArrowIcon css={{ transform: "rotate(180deg)" }} />
      </Stack>
    </Stack>
  );
}

export { ArticleDetailScreen };
