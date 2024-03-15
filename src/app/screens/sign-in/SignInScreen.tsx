import { Button, Stack, TextField, Typography } from "@mui/material";
import { UnderlineTitle } from "@components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { emailSchema, passwordSchema } from "@libs/schema";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SIGN_UP_ROUTES } from "@routes";

const validationSchema = yup
  .object({
    email: emailSchema().required(),
    password: passwordSchema().required(),
  })
  .required();

function SignInScreen() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  const [errorMessage, setErrorMessage] = useState<string>("");
  // form hooks
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<yup.InferType<typeof validationSchema>>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // query hooks
  // calculated values
  // effects
  useEffect(() => {
    if (!Object.keys(errors).length) {
      setErrorMessage("");
    }
  }, [errors]);
  // handlers

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <Stack
        direction="column"
        css={{
          padding: "40px",
          boxShadow: "20px 16px 0px #000",
          borderRadius: "16px",
          border: "2px solid #000",
        }}
        spacing="32px"
      >
        <UnderlineTitle title="로그인" />
        <Stack direction="column" spacing="16px">
          <TextField
            css={{ borderRadius: "8px" }}
            placeholder="이메일"
            {...register("email")}
            defaultValue={getValues("email")}
          />
          <TextField
            css={{ borderRadius: "8px" }}
            placeholder="비밀번호"
            type="password"
            {...register("password")}
            defaultValue={getValues("password")}
          />
          <Stack direction="column" spacing="4px">
            {errorMessage && (
              <span css={{ fontSize: "10px", color: "#FF2626" }}>
                {errorMessage}
              </span>
            )}
            <Button
              variant="contained"
              css={{
                backgroundColor: "#5555FF",
                borderRadius: "32px",
                ":hover": {
                  backgroundColor: "#7777FF",
                },
              }}
              onClick={handleSubmit(
                (data) => {
                  console.log(data);
                },
                (e) => {
                  console.log("!!!", e);
                  if (e.password?.type === "required") {
                    setErrorMessage("비밀번호를 입력해주세요.");
                  }
                  if (e.email?.type === "required") {
                    setErrorMessage("이메일을 입력해주세요.");
                  } else {
                    setErrorMessage(
                      "이메일 또는 비밀번호가 잘못 입력되었습니다. 다시 확인해주세요."
                    );
                  }
                }
              )}
            >
              로그인
            </Button>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography
              css={{
                fontSize: "16px",
                marginBottom: "8px",
                color: "#5E6C83",
              }}
            >
              계정이 없으신가요? &nbsp;
              <Link to={SIGN_UP_ROUTES} css={{ color: "#5555FF" }}>
                회원가입
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { SignInScreen };
