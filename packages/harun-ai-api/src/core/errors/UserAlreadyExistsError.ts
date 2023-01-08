import IError from './Error';

export default class UserAlreadyExistsError extends IError {
  constructor(message?: string) {
    super('USER_ALREADY_EXISTS', message);
  }
}
