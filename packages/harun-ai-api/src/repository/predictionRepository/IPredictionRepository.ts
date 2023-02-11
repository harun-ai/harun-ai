import Prediction from '../../core/entities/Prediction';

export default interface IPredictionRepository {
  save(prediction: Prediction): Promise<Prediction>;
  get(predictionId: Prediction['id']): Promise<Prediction>;
  getAll(): Promise<Partial<Prediction>[]>;
  evaluate(predictionId: Prediction['id'], liked: boolean): Promise<Prediction>;
}
