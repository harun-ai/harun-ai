import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type CreateModelUseCaseDTO = {
  Request: {
    name: string;
    model: string;
    inputSchema: Record<string, unknown>;
    prompt: string;
    description: string;
  };
  Response: Model;
};

export default class CreateModelUseCase
  implements IUseCase<CreateModelUseCaseDTO>
{
  constructor(private modelRepository: IModelRepository) {}
  async use(model: CreateModelUseCaseDTO['Request']): Promise<Model> {
    return this.modelRepository.save(model);
  }
}
