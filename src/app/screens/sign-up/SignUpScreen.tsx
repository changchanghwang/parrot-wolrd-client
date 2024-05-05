import { Stack, TextField, formHelperTextClasses } from "@mui/material";
import { Timer, UnderlineTitle } from "@components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { emailSchema, passwordSchema } from "@libs/schema";
import { useEffect, useState } from "react";
import { useMutation } from "@libs/query";
import { userRepository, verificationRepository } from "@repositories";
import { Button } from "@components";
import { Subject, debounceTime } from "rxjs";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ROUTE_HOME, ROUTE_SIGN_UP_SUCCESS } from "@routes";
import ArrowLeft from "@assets/images/icons/icon-arrow-left.svg";

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
  const navigate = useNavigate();
  const location = useLocation();
  // state, ref hooks
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [verificationId, setVerificationId] = useState<number>();
  const [verified, setVerified] = useState<{
    email: boolean;
    nickName: string;
  }>({ email: false, nickName: "" });
  const [time, setTime] = useState<number>();
  const [nickName$] = useState(new Subject<{ nickName: string }>());
  // form hooks
  const {
    register,
    handleSubmit,
    getValues,
    setError,
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
  const [verifyEmail, { isLoading: isLoadingVerifyEmail }] = useMutation(
    verificationRepository.verifyEmail,
    {
      onCompleted: (data) => {
        setVerificationId(data.id);
        setVerified((prev) => ({ ...prev, email: false }));
        setTime(new Date(data.expiredAt).getTime() - new Date().getTime());
      },
    }
  );

  const [verifyCode, { isLoading: isLoadingVerifyCode }] = useMutation(
    verificationRepository.verifyCode,
    {
      onCompleted: () => {
        setVerified((prev) => ({ ...prev, email: true }));
      },
    }
  );
  //TODO: useLazyQuery 개발 후 변경
  const [checkDuplicatedNickName] = useMutation(
    userRepository.checkDuplicatedNickName
  );

  const [signUp, { isLoading: isLoadingSignUp }] = useMutation(
    userRepository.signUp,
    {
      onCompleted: () => {
        navigate(ROUTE_SIGN_UP_SUCCESS);
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

  useEffect(() => {
    const subscription = nickName$
      .pipe(debounceTime(500))
      .subscribe(async ({ nickName }) => {
        await checkDuplicatedNickName(
          { nickName },
          {
            onSuccess: (data) => {
              data.isDuplicated &&
                setError("nickName", {
                  message: "이미 사용중인 닉네임 입니다.",
                });
              setVerified((prev) => ({
                ...prev,
                nickName: !data.isDuplicated
                  ? "사용 가능한 닉네임 입니다."
                  : "",
              }));
            },
          }
        );
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [nickName$]);
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
            to={location.state.from ?? ROUTE_HOME}
            replace
            css={{ flex: 1, verticalAlign: "middle" }}
          >
            <ArrowLeft
              css={{ width: "28px", height: "28px" }}
              onClick={() => {
                navigate(-1);
              }}
            />
          </Link>
          <UnderlineTitle title="회원가입" css={{ flex: 1 }} />
          <div css={{ flex: 1 }} />
        </Stack>
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
              loading={isLoadingVerifyEmail}
              variant="outlined"
              onClick={async () => {
                await verifyEmail({
                  to: getValues("email"),
                  type: "SIGNUP",
                });
              }}
            >
              인증
            </Button>
          </Stack>
          <Stack direction="row" spacing="8px">
            <div css={{ position: "relative", flex: 1 }}>
              <TextField
                css={{
                  borderRadius: "8px",
                  width: "100%",
                }}
                placeholder="인증번호"
                disabled={!verificationId || verified.email}
                {...register("authCode")}
                defaultValue={getValues("authCode")}
                error={!!errors.authCode}
                helperText={errors.authCode?.message}
              />
              {time !== undefined && !verified.email && (
                <Timer
                  milliseconds={time}
                  onChange={setTime}
                  css={{ position: "absolute", right: "12px", top: "15px" }}
                />
              )}
            </div>
            <Button
              css={{ flex: 0.2, fontSize: "12px" }}
              variant="outlined"
              disabled={!verificationId}
              loading={isLoadingVerifyCode}
              onClick={async () => {
                await verifyCode({
                  id: verificationId!,
                  code: getValues("authCode"),
                });
              }}
            >
              확인
            </Button>
          </Stack>
          <TextField
            css={{
              borderRadius: "8px",
              flex: 1,
              [`& .${formHelperTextClasses.root}`]: {
                color: "#5555ff",
              },
            }}
            placeholder="닉네임"
            {...register("nickName")}
            onChange={(e) => {
              register("nickName").onChange(e);
              nickName$.next({ nickName: e.target.value });
            }}
            defaultValue={getValues("nickName")}
            error={!!errors.nickName}
            helperText={errors.nickName?.message || verified.nickName}
          />
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
              loading={isLoadingSignUp}
              disabled={!isValid}
              css={{
                backgroundColor: "#5555FF",
                borderRadius: "32px",
                fontSize: "20px",
                ":hover": {
                  backgroundColor: "#7777FF",
                },
              }}
              onClick={handleSubmit(({ email, password, nickName }) =>
                signUp({ email, password, nickName })
              )}
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
