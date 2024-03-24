export * from "./sign-in";
export * from "./sign-up";

import { Stack, Typography } from "@mui/material";
import { Image } from "@components";

function HomeScreen() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing="1%"
      >
        <Typography variant="h1" css={{ fontSize: "32px", fontFamily: "Rock" }}>
          Parrot
        </Typography>
        <Image
          source={{
            uri: "logos/logo_with_black_eye.jpeg",
            width: "180px",
            height: "72px",
          }}
        />
        <Typography variant="h1" css={{ fontSize: "32px", fontFamily: "Rock" }}>
          World
        </Typography>
      </Stack>
    </Stack>
  );
}

export { HomeScreen };
