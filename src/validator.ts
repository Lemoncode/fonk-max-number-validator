import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'MAX_NUMBER';

let defaultMessage = 'The value must be lower than or equal to {{maxValue}}';
export const setErrorMessage = message => (defaultMessage = message);

interface CustomValidatorArgs {
  maxValue: number;
  inclusive?: boolean;
}

const defaultCustomArgs: CustomValidatorArgs = {
  maxValue: 0,
  inclusive: true,
};

const validateType = value => typeof value === 'number';

const validate = (value, args: CustomValidatorArgs) =>
  args.inclusive ? value <= args.maxValue : value < args.maxValue;

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
    !isDefined(value) || (validateType(value) && validate(value, args));

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, args),
    type: VALIDATOR_TYPE,
  };
};
