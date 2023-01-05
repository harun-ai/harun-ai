import IError from './Error';

export default class ModelNotFoundError extends IError {
  constructor(message?: string) {
    super('MODEL_NOT_FOUND', message);
  }
}
