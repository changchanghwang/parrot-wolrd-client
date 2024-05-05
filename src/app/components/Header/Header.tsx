import { Divider, Stack } from "@mui/material";
import { useUser } from "@libs/auth";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP } from "@routes";

function Header() {
  // prop destruction
  // lib hooks
  const [user] = useUser({ canBeUnauthenticated: true });
  const location = useLocation();
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing="12px"
        alignItems="center"
        css={{
          maxWidth: "960px",
          width: "100%",
          margin: "0px auto",
          padding: "8px 0",
        }}
      >
        {!user && (
          <>
            <Link to={ROUTE_SIGN_UP} state={{ from: location.pathname }}>
              회원가입
            </Link>
            <Link to={ROUTE_SIGN_IN} state={{ from: location.pathname }}>
              로그인
            </Link>
          </>
        )}
      </Stack>
      <Divider />
    </>
  );
}

export { Header };
