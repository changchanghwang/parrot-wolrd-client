import { Stack } from "@mui/material";
import { MenuButton } from "../MenuButton";
import { ROUTE_ARTICLES_FREE, ROUTE_ARTICLES_WIKI } from "@routes";

function WebMenu() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Stack
      direction="row"
      css={{
        maxWidth: "960px",
        width: "100%",
        minWidth: "40%",
        backgroundColor: "#D1D1FF",
        border: "2px solid #AFAFFF",
        maxHeight: "48px",
      }}
    >
      <MenuButton items={[{ to: ROUTE_ARTICLES_FREE, title: "자유 게시판" }]}>
        자유게시판
      </MenuButton>
      <MenuButton
        items={[
          { to: `${ROUTE_ARTICLES_WIKI}/small`, title: "소형조" },
          { to: `${ROUTE_ARTICLES_WIKI}/medium`, title: "중형조" },
          { to: `${ROUTE_ARTICLES_WIKI}/large`, title: "대형조" },
        ]}
      >
        앵위키
      </MenuButton>
    </Stack>
  );
}

export { WebMenu };
