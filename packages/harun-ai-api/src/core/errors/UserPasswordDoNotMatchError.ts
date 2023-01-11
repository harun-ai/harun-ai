import AbstractError from './AbstractError';

export default class UserPasswordDoNotMatchError extends AbstractError {
  constructor(message?: string) {
    super('USER_PASSWORD_DO_NOT_MATCH', message);
  }
}
