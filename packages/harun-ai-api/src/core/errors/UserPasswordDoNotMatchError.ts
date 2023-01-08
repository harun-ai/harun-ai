import IError from './Error';

export default class UserPasswordDoNotMatchError extends IError {
  constructor(message?: string) {
    super('USER_PASSWORD_DO_NOT_MATCH', message);
  }
}
