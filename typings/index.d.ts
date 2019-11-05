import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace maxNumber {
  export interface CustomValidatorArgs {
    strictTypes?: boolean;
    maxValue: number;
    inclusive?: boolean;
  }
  export const validator: FieldValidationFunctionSync<CustomValidatorArgs>;
  export function setErrorMessage(message: string | string[]): void;
  export function setCustomArgs(customArgs: Partial<CustomValidatorArgs>): void;
}
