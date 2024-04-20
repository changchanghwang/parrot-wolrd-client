import { Button, Stack, TextField, Typography } from "@mui/material";
import { UnderlineTitle } from "@components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { emailSchema, passwordSchema } from "@libs/schema";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_HOME, ROUTE_SIGN_UP } from "@routes";
import { userRepository } from "@repositories";
import { useMutation } from "@libs/query";
import ArrowLeft from "@assets/images/icons/icon-arrow-left.svg";

const validationSchema = yup
  .object({
    email: emailSchema().required(),
    password: passwordSchema({ match: false }).required(),
  })
  .required();

function SignInScreen() {
  // prop destruction
  // lib hooks
  const navigate = useNavigate();
  const location = useLocation();
  // state, ref hooks
  const [errorMessage, setErrorMessage] = useState<string>("");
  // form hooks
  const {
    register,
    handleSubmit: handleFormSubmit,
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
  const [signIn, { isLoading }] = useMutation(userRepository.signIn, {
    onCompleted: () => {
      navigate("/", { replace: true });
    },
  });
  // calculated values
  // effects
  useEffect(() => {
    if (!Object.keys(errors).length) {
      setErrorMessage("");
    }
    return () => {
      setErrorMessage("");
    };
  }, [errors]);
  // handlers
  const handleSubmit = async (e: any) => {
    await handleFormSubmit(
      async ({ email, password }) => {
        await signIn({ email, password });
      },
      (e) => {
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
    )(e);
  };

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
          width: "26%",
          padding: "32px",
          boxShadow: "20px 16px 0px #000",
          borderRadius: "16px",
          border: "3px solid #000",
        }}
        spacing="32px"
      >
        <Stack direction="row" justifyContent="space-between">
          <Link
            to={location.state ?? ROUTE_HOME}
            replace
            css={{ flex: 1, verticalAlign: "middle", cursor: "pointer" }}
          >
            <ArrowLeft css={{ width: "28px", height: "28px" }} />
          </Link>
          <UnderlineTitle title="로그인" css={{ flex: 1 }} />
          <div css={{ flex: 1 }} />
        </Stack>
        <Stack direction="column" spacing="16px">
          <TextField
            css={{ borderRadius: "8px" }}
            placeholder="이메일"
            {...register("email")}
            defaultValue={getValues("email")}
            onKeyDown={async (e) => {
              e.key === "Enter" && (await handleSubmit(e));
            }}
          />
          <TextField
            css={{ borderRadius: "8px" }}
            placeholder="비밀번호"
            type="password"
            {...register("password")}
            defaultValue={getValues("password")}
            onKeyDown={async (e) => {
              e.key === "Enter" && (await handleSubmit(e));
            }}
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
                fontSize: "20px",
              }}
              onClick={handleSubmit}
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
              <Link
                to={ROUTE_SIGN_UP}
                state={location.pathname}
                css={{ color: "#5555FF" }}
              >
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
