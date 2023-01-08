import IError from './Error';

export default class UserNotFoundError extends IError {
  constructor(message?: string) {
    super('USER_NOT_FOUND', message);
  }
}
