import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import IUseCase from '../IUseCase';

export type DeleteModelUseCaseDTO = {
  Request: {
    modelId: string;
  };
  Response: void;
};

export default class DeleteModelUseCase
  implements IUseCase<DeleteModelUseCaseDTO>
{
  constructor(private modelRepository: IModelRepository) {}
  async use({ modelId }: DeleteModelUseCaseDTO['Request']): Promise<void> {
    return this.modelRepository.delete(modelId);
  }
}
