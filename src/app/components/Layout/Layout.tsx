import { Stack, Typography } from "@mui/material";
import { Image, WebMenu, Header } from "@components";
import { ReactNode } from "react";

function Layout(props: { children: ReactNode }) {
  // prop destruction
  const { children } = props;
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Stack>
      <Header />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing="1%"
        css={{
          margin: "8px 0",
        }}
      >
        <Image
          source={{
            uri: "logos/logo_with_black_eye.jpeg",
            width: "120px",
            height: "48px",
          }}
          alt="Logo"
        />
        <Typography variant="h1" css={{ fontSize: "28px", fontFamily: "Rock" }}>
          Morning
        </Typography>
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <WebMenu />
      </Stack>
      <Stack
        css={{
          maxWidth: "960px",
          width: "100%",
          margin: "16px auto",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}

export { Layout };
