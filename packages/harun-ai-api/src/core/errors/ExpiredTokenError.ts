import AbstractError from './AbstractError';

export default class ExpiredTokenError extends AbstractError {
  constructor(message?: string) {
    super('EXPIRED_TOKEN', message);
  }
}
