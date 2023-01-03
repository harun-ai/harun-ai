import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type ListModelsUseCaseDTO<IdType> = {
  Request: object;
  Response: Model<IdType>[];
};

export default class ListModelsUseCase<IdType>
  implements IUseCase<ListModelsUseCaseDTO<IdType>>
{
  constructor(private modelRepository: IModelRepository<IdType>) {}

  async use(): Promise<Model<IdType>[]> {
    return this.modelRepository.getAll();
  }
}
