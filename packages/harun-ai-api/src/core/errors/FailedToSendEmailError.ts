import AbstractError from './AbstractError';

export default class FailedToSendEmailError extends AbstractError {
  constructor(message?: string) {
    super('FAILED_TO_SEND_EMAIL', message);
  }
}
