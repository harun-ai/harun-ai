import AbstractError from './AbstractError';

export default class PredictionNotFoundError extends AbstractError {
  constructor(message?: string) {
    super('PREDICTION_NOT_FOUND', message);
  }
}
