import AbstractError from './AbstractError';

export default class InvalidTokenError extends AbstractError {
  constructor(message?: string) {
    super('INVALID_TOKEN', message);
  }
}
