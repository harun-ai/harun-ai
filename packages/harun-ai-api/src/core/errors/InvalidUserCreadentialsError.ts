import AbstractError from './AbstractError';

export default class InvalidUserCredentialsError extends AbstractError {
  constructor(message?: string) {
    super('INVALID_USER_CREDENTIALS', message);
  }
}
