import AbstractError from './AbstractError';

export default class ModelNotFoundError extends AbstractError {
  constructor(message?: string) {
    super('MODEL_NOT_FOUND', message);
  }
}
