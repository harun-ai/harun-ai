import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import IUseCase from '../IUseCase';

export type DeleteModelUseCaseDTO<IdType> = {
  Request: {
    modelId: IdType;
  };
  Response: void;
};

export default class DeleteModelUseCase<IdType>
  implements IUseCase<DeleteModelUseCaseDTO<IdType>>
{
  constructor(private modelRepository: IModelRepository<IdType>) {}
  async use({
    modelId,
  }: DeleteModelUseCaseDTO<IdType>['Request']): Promise<void> {
    return this.modelRepository.delete(modelId);
  }
}
