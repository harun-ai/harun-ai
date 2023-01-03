import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type GetModelUseCaseDTO<IdType> = {
  Request: {
    modelId: IdType;
  };
  Response: Model<IdType>;
};

export default class GetModelUseCase<IdType>
  implements IUseCase<GetModelUseCaseDTO<IdType>>
{
  constructor(private modelRepository: IModelRepository<IdType>) {}
  async use({
    modelId,
  }: GetModelUseCaseDTO<IdType>['Request']): Promise<Model<IdType>> {
    return this.modelRepository.get(modelId);
  }
}
