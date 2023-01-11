import AbstractError from './AbstractError';

export default class UnverifiedUserError extends AbstractError {
  constructor(message?: string) {
    super('UNVERIFIED_USER', message);
  }
}
