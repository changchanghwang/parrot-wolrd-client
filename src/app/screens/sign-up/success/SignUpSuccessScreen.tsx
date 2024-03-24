import { Stack, Typography } from "@mui/material";
import { UnderlineTitle } from "@components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpSuccessScreen() {
  // prop destruction
  // lib hooks
  const navigate = useNavigate();
  // state, ref hooks
  const [time, setTime] = useState(3);
  // form hooks
  // query hooks
  // calculated values
  // effects
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      navigate("/");
    }
  }, [time]);

  console.log("!!!", time);
  // handlers
  return (
    <Stack
      spacing="5%"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <UnderlineTitle css={{ fontSize: "64px" }} title="회원가입 완료" />
      <Typography variant="h5">
        회원가입을 축하드립니다. 본 페이지는 3초후 홈 화면으로 이동합니다.
      </Typography>
    </Stack>
  );
}

export { SignUpSuccessScreen };
