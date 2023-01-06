import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type GetModelUseCaseDTO = {
  Request: {
    modelId: string;
  };
  Response: Model;
};

export default class GetModelUseCase implements IUseCase<GetModelUseCaseDTO> {
  constructor(private modelRepository: IModelRepository) {}
  async use({ modelId }: GetModelUseCaseDTO['Request']): Promise<Model> {
    return this.modelRepository.get(modelId);
  }
}
