import IError from './Error';

export default class InvalidInputParamsError extends IError {
  constructor(message?: string) {
    super('INVALID_INPUT_PARAMS_ERROR', message);
  }
}
