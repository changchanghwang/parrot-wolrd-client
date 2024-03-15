import * as yup from "yup";

export const emailSchema = () => yup.string().email();
export const passwordSchema = () =>
  yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)(?!.*\s).*$/,
      "8~16자 영문 대소문자, 숫자, 특수문자 (!@#$%^&*-_+.,?)만 사용 가능합니다."
    )
    .min(8)
    .max(16);
