import IPredictionRepository from '../../../repository/predictionRepository/IPredictionRepository';
import Prediction from '../../entities/Prediction';
import IUseCase from '../IUseCase';

export type ListPredictionsUseCaseDTO = {
  Request: void;
  Response: Partial<Prediction>[];
};

export default class ListPredictionsUseCase
  implements IUseCase<ListPredictionsUseCaseDTO>
{
  constructor(private predictionRepository: IPredictionRepository) {}

  async use(): Promise<ListPredictionsUseCaseDTO['Response']> {
    return await this.predictionRepository.getAll();
  }
}
