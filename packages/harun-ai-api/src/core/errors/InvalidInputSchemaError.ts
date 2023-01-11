import AbstractError from './AbstractError';

export default class InvalidInputSchemaError extends AbstractError {
  constructor(message?: string) {
    super('INVALID_INPUT_SCHEMA', message);
  }
}
