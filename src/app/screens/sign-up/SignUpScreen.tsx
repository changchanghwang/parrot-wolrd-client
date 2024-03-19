import { Button, Stack, TextField, Typography } from "@mui/material";
import { UnderlineTitle } from "@components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { emailSchema, passwordSchema } from "@libs/schema";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SIGN_UP_ROUTES } from "@routes";
import { useMutation } from "@libs/query";
import { verificationRepository } from "@repositories";
import { VerificationType } from "@models";

const validationSchema = yup
  .object({
    email: emailSchema().required("이메일을 입력해주세요."),
    authCode: yup.string().required("인증번호를 입력해주세요."),
    nickName: yup.string().required("닉네임을 입력해주세요."),
    password: passwordSchema({ match: true }).required(
      "비밀번호를 입력해주세요."
    ),
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "비밀번호가 일치하지 않습니다. 다시한번 확인해주세요."
      )
      .required("비밀번호를 입력해주세요."),
  })
  .required();

function SignUpScreen() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [verificationId, setVerificationId] = useState<number>();
  // form hooks
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<yup.InferType<typeof validationSchema>>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      authCode: "",
      nickName: "",
      password: "",
      passwordConfirm: "",
    },
  });
  // query hooks
  const [verifyEmail, { isLoading }] = useMutation(
    verificationRepository.verifyEmail,
    {
      onCompleted: (data) => {
        setVerificationId(data.id);
      },
    }
  );
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
          width: "23%",
          padding: "32px",
          boxShadow: "20px 16px 0px #000",
          borderRadius: "16px",
          border: "2px solid #000",
        }}
        spacing="32px"
      >
        <UnderlineTitle title="회원가입" />
        <Stack direction="column" spacing="16px">
          <Stack direction="row" spacing="8px">
            <TextField
              css={{ borderRadius: "8px", flex: 1 }}
              placeholder="이메일"
              {...register("email")}
              defaultValue={getValues("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Button
              css={{ flex: 0.2, fontSize: "12px" }}
              variant="outlined"
              onClick={async () => {
                await verifyEmail({
                  email: getValues("email"),
                  type: VerificationType.SIGNIN,
                });
              }}
            >
              인증
            </Button>
          </Stack>
          <Stack direction="row" spacing="8px">
            <TextField
              css={{ borderRadius: "8px", flex: 1 }}
              placeholder="인증번호"
              {...register("authCode")}
              defaultValue={getValues("authCode")}
              error={!!errors.authCode}
              helperText={errors.authCode?.message}
            />
            <Button
              css={{ flex: 0.2, fontSize: "12px" }}
              variant="outlined"
              onClick={() => {}}
            >
              확인
            </Button>
          </Stack>
          <Stack direction="row" spacing="8px">
            <TextField
              css={{ borderRadius: "8px", flex: 1 }}
              placeholder="닉네임"
              {...register("nickName")}
              defaultValue={getValues("nickName")}
              error={!!errors.nickName}
              helperText={errors.nickName?.message}
            />
            <Button
              css={{ flex: 0.2, fontSize: "12px" }}
              variant="outlined"
              onClick={() => {}}
            >
              중복확인
            </Button>
          </Stack>
          <TextField
            css={{ borderRadius: "8px" }}
            placeholder="비밀번호"
            type="password"
            {...register("password")}
            defaultValue={getValues("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            css={{ borderRadius: "8px" }}
            placeholder="비밀번호 확인"
            type="password"
            {...register("passwordConfirm")}
            defaultValue={getValues("passwordConfirm")}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
          />
          <Stack direction="column" spacing="4px">
            {errorMessage && (
              <span css={{ fontSize: "10px", color: "#FF2626" }}>
                {errorMessage}
              </span>
            )}
            <Button
              variant="contained"
              disabled={!isValid}
              css={{
                backgroundColor: "#5555FF",
                borderRadius: "32px",
                fontSize: "20px",
                ":hover": {
                  backgroundColor: "#7777FF",
                },
              }}
              onClick={handleSubmit((data) => {
                console.log(data);
              })}
            >
              회원가입
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { SignUpScreen };
