import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'MAX_NUMBER';

let defaultMessage = 'The value must be lower than or equal to {{maxValue}}';
export const setErrorMessage = message => (defaultMessage = message);

interface CustomValidatorArgs {
  strictTypes?: boolean;
  maxValue: number;
  inclusive?: boolean;
}

let defaultCustomArgs: CustomValidatorArgs = {
  strictTypes: false,
  maxValue: 0,
  inclusive: true,
};
export const setCustomArgs = (customArgs: Partial<CustomValidatorArgs>) =>
  (defaultCustomArgs = { ...defaultCustomArgs, ...customArgs });

const validateType = (value, args: CustomValidatorArgs) =>
  !args.strictTypes || typeof value === 'number';

const validate = (value, args: CustomValidatorArgs) =>
  !isNaN(Number(value))
    ? args.inclusive
      ? value <= args.maxValue
      : value < args.maxValue
    : false;

const isDefined = value => value !== void 0 && value !== null && value !== '';

export const validator: FieldValidationFunctionSync = fieldValidatorArgs => {
  const {
    value,
    message = defaultMessage,
    customArgs = defaultCustomArgs,
  } = fieldValidatorArgs;

  const args: CustomValidatorArgs = {
    ...defaultCustomArgs,
    ...customArgs,
  };

  const succeeded =
    !isDefined(value) || (validateType(value, args) && validate(value, args));

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, args),
    type: VALIDATOR_TYPE,
  };
};
