import AbstractError from './AbstractError';

export default class UserHasNoPasswordError extends AbstractError {
  constructor(message?: string) {
    super('USER_HAS_NO_PASSWORD', message);
  }
}
