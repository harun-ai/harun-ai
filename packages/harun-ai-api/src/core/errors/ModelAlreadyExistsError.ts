import IError from './Error';

export default class ModelAlreadyExistsError extends IError {
  constructor(message?: string) {
    super('MODEL_ALREADY_EXISTS_ERROR', message);
  }
}
