import AbstractError from './AbstractError';

export default class ModelAlreadyExistsError extends AbstractError {
  constructor(message?: string) {
    super('MODEL_ALREADY_EXISTS_ERROR', message);
  }
}
