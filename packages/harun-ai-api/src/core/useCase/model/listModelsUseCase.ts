import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type ListModelsUseCaseDTO = {
  Request: object;
  Response: Model[];
};

export default class ListModelsUseCase
  implements IUseCase<ListModelsUseCaseDTO>
{
  constructor(private modelRepository: IModelRepository) {}

  async use(): Promise<Model[]> {
    return this.modelRepository.getAll();
  }
}
