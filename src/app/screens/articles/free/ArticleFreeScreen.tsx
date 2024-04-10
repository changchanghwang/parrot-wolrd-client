import { Pagination, Stack, Typography } from "@mui/material";
import { useQuery } from "@libs/query";
import { articleRepository } from "@repositories";
import { useState } from "react";
import { Article } from "@components";
import { CategoryCode } from "@models";

function ArticleFreeScreen() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  const [page, setPage] = useState(1);

  // form hooks
  // query hooks
  const { data: announcements } = useQuery(articleRepository.list, {
    variables: {
      categoryCode: CategoryCode.ANNOUNCEMENT,
      page: 1,
      limit: 3,
    },
  });

  const { data: freeArticles } = useQuery(articleRepository.list, {
    variables: {
      categoryCode: CategoryCode.FREE,
      page,
      limit: 20,
    },
  });
  // calculated values
  // effects
  // handlers

  return (
    <Stack direction="column" spacing="16px">
      <Typography variant="h1" css={{ fontSize: "28px", fontWeight: 700 }}>
        자유 게시판
      </Typography>

      <Stack direction="column" spacing="32px" alignItems="center">
        <Stack direction="column" css={{ width: "100%" }}>
          {announcements?.items.map((article) => (
            <Article key={article.id} article={article} />
          ))}
          {freeArticles?.items.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </Stack>
        <Pagination
          count={Math.ceil((freeArticles?.count ?? 0) / 20)}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </Stack>
    </Stack>
  );
}

export { ArticleFreeScreen };
