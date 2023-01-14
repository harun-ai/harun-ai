import Prediction from '../../core/entities/Prediction';

export default interface IPredictionRepository {
  save(prediction: Prediction): Promise<Prediction>;
  getAll(): Promise<Partial<Prediction>[]>;
}
