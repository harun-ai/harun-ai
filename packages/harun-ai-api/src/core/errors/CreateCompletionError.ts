import AbstractError from './AbstractError';

export default class CreateCompletionError extends AbstractError {
  constructor(message?: string) {
    super('CREATE_COMPLETION_ERROR', message);
  }
}
