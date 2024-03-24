export type VerificationType = "SIGNUP";

export class VerificationModel {
  id!: number;
  expiredAt!: DateTime;
  type!: VerificationType;
}
