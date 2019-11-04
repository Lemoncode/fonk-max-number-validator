import { validator, setErrorMessage, setCustomArgs } from './validator';

const VALIDATOR_TYPE = 'MAX_NUMBER';
const TEST_MESSAGE = 'Custom message for tests';

describe('fonk-max-number-validator specs', () => {
  it('should return succeeded validation when it feeds value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals null', () => {
    // Arrange
    const value = null;

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals empty string', () => {
    // Arrange
    const value = '';

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and message', () => {
    // Arrange
    const value = 'test';

    // Act
    const result = validator({ value, message: TEST_MESSAGE });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: TEST_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is lower than max-value', () => {
    // Arrange
    const value = 1;

    // Act
    const result = validator({
      value,
      customArgs: { maxValue: 2 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is equals to max-value, with inclusive flag true by default', () => {
    // Arrange
    const value = 1;

    // Act
    const result = validator({
      value,
      customArgs: { maxValue: 1 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is equals to max-value, within inclusive flag', () => {
    // Arrange
    const value = 1;

    // Act
    const result = validator({
      value,
      message: 'The value must be lower than 1',
      customArgs: { maxValue: 1, inclusive: false },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than 1',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is greater than max-value', () => {
    // Arrange
    const value = 2;

    // Act
    const result = validator({
      value,
      customArgs: { maxValue: 1 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than or equal to 1',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when type of feeds value is string', () => {
    // Arrange
    const value = 'a';

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is true', () => {
    // Arrange
    const value = true;

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is false', () => {
    // Arrange
    const value = false;

    // Act
    const result = validator({
      value,
      customArgs: { strictTypes: true },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an object', () => {
    // Arrange
    const value = {};

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an array', () => {
    // Arrange
    const value = [];

    // Act
    const result = validator({
      value,
      customArgs: { strictTypes: true },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a function', () => {
    // Arrange
    const value = () => null;

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation with interpolated message', () => {
    // Arrange
    const value = 101;

    // Act
    const result = validator({
      value,
      message:
        'The maximum value is {{maxValue}} and value is greater than {{maxValue}}!',
      customArgs: {
        maxValue: 100,
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The maximum value is 100 and value is greater than 100!',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    // Arrange
    const value = 101;

    setErrorMessage('The value must be lower than {{maxValue}}!');

    // Act
    const result = validator({
      value,
      customArgs: {
        maxValue: 100,
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than 100!',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default customArgs when it feeds value is valid and calls to setCustomArgs', () => {
    // Arrange
    const value = '1';

    setCustomArgs({ strictTypes: true });

    // Act
    const result = validator({ value, customArgs: { maxValue: 5 } });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be lower than 5!',
      type: VALIDATOR_TYPE,
    });
  });
});
