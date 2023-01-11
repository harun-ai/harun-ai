import AbstractError from './AbstractError';

export default class UserNotFoundError extends AbstractError {
  constructor(message?: string) {
    super('USER_NOT_FOUND', message);
  }
}
