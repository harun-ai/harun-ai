import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type CreateModelUseCaseDTO<IdType> = {
  Request: {
    id: IdType;
    name?: string;
    inputSchema?: object;
    text?: string;
    description?: string;
  };
  Response: Model<IdType>;
};

export default class CreateModelUseCase<IdType>
  implements IUseCase<CreateModelUseCaseDTO<IdType>>
{
  constructor(private modelRepository: IModelRepository<IdType>) {}
  async use(
    model: CreateModelUseCaseDTO<IdType>['Request']
  ): Promise<Model<IdType>> {
    return this.modelRepository.save(model);
  }
}
