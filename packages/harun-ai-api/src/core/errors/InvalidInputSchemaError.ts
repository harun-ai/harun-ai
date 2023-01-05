import IError from './Error';

export default class InvalidInputSchemaError extends IError {
  constructor(message?: string) {
    super('INVALID_INPUT_SCHEMA', message);
  }
}
