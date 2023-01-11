import AbstractError from './AbstractError';

export default class InvalidInputParamsError extends AbstractError {
  constructor(message?: string) {
    super('INVALID_INPUT_PARAMS_ERROR', message);
  }
}
