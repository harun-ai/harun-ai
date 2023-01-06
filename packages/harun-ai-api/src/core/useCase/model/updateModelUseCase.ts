import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type UpdateModelUseCaseDTO = {
  Request: {
    id: string;
    model?: string;
    description?: string;
    inputSchema?: Record<string, unknown>;
    prompt?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  };
  Response: Model;
};

export default class UpdateModelUseCase
  implements IUseCase<UpdateModelUseCaseDTO>
{
  constructor(private modelRepository: IModelRepository) {}
  async use(model: UpdateModelUseCaseDTO['Request']): Promise<Model> {
    return this.modelRepository.update(model);
  }
}
