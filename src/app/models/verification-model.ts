export enum VerificationType {
  SIGNIN,
}

class Verification {
  id!: number;
  type!: VerificationType;
}
