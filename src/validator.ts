import { FieldValidationFunctionSync } from '@lemoncode/fonk';
import { CustomValidatorArgs } from './validator.model';
import { buildCustomMessage, isDefined } from './validator.business';

const VALIDATOR_TYPE = 'MAX_NUMBER';

let defaultMessage = 'The value must be less than or equal to {{maxValue}}';
export const setErrorMessage = message => (defaultMessage = message);

const defaultCustomArgs: CustomValidatorArgs = {
  maxValue: 0,
  inclusive: true,
};

const validateType = value => typeof value === 'number';

const validate = (value, args: CustomValidatorArgs) =>
  args.inclusive ? value <= args.maxValue : value < args.maxValue;

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
      : buildCustomMessage((message as string) || defaultMessage, args),
    type: VALIDATOR_TYPE,
  };
};
