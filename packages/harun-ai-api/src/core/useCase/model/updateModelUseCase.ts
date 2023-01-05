import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type UpdateModelUseCaseDTO<IdType> = {
  Request: {
    id: IdType;
    inputSchema?: object;
    text?: string;
    description?: string;
  };
  Response: Model<IdType>;
};

export default class UpdateModelUseCase<IdType>
  implements IUseCase<UpdateModelUseCaseDTO<IdType>>
{
  constructor(private modelRepository: IModelRepository<IdType>) {}
  async use(
    model: UpdateModelUseCaseDTO<IdType>['Request']
  ): Promise<Model<IdType>> {
    return this.modelRepository.update(model);
  }
}
