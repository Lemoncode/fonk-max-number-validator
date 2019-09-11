import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace maxNumber {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
