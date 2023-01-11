import AbstractError from './AbstractError';

export default class UserAlreadyExistsError extends AbstractError {
  constructor(message?: string) {
    super('USER_ALREADY_EXISTS', message);
  }
}
