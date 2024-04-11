import { Pagination, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@libs/query";
import { articleRepository } from "@repositories";
import { useState } from "react";
import { Article, Button, Select } from "@components";
import { CategoryCode } from "@models";
import { ROUTE_ARTICLES_WRITE } from "../../../routes";

function ArticleFreeScreen() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ key: "title", value: "" });

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
      search: search.value ? search : undefined,
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
          showFirstButton
          showLastButton
        />
        <Stack
          direction="row"
          css={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div css={{ display: "flex", flex: 1 }} />
          <Stack direction="row" spacing="8px" alignItems="center" flex={1}>
            <Select
              variant="outlined"
              value={search.key}
              options={[
                { label: "제목", value: "title" },
                { label: "제목+내용", value: "withContent" },
                { label: "작성자", value: "author" },
              ]}
              onChange={(e) => {
                setSearch({ ...search, key: e.target.value });
              }}
            />
            <TextField
              variant="outlined"
              value={search.value}
              onChange={(e) => setSearch({ ...search, value: e.target.value })}
            />
            <Button variant="outlined">검색</Button>
          </Stack>

          <Stack direction="row" flex={1} justifyContent="flex-end">
            <Button
              variant="contained"
              component="a"
              href={ROUTE_ARTICLES_WRITE}
            >
              글쓰기
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { ArticleFreeScreen };
