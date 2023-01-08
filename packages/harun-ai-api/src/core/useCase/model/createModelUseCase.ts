import IdProvider from '../../../provider/idProvider/IdProvider';
import ISchemaProvider from '../../../provider/schemaProvider/ISchemaProvider';
import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import InvalidInputSchemaError from '../../errors/InvalidInputSchemaError';
import IUseCase from '../IUseCase';

export type CreateModelUseCaseDTO = {
  Request: Omit<
    Model,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'isActive'
  >;
  Response: Model;
};

export default class CreateModelUseCase
  implements IUseCase<CreateModelUseCaseDTO>
{
  constructor(
    private modelRepository: IModelRepository,
    private schemaProvider: ISchemaProvider,
    private idProvider: IdProvider
  ) {}
  async use(request: CreateModelUseCaseDTO['Request']): Promise<Model> {
    try {
      await this.schemaProvider.validateSchema(request.inputSchema);
    } catch (error) {
      if (error instanceof Error)
        throw new InvalidInputSchemaError(error.message);

      throw new InvalidInputSchemaError();
    }

    const id = await this.idProvider.generateId();

    const model = new Model({
      ...request,
      id,
    });

    return this.modelRepository.save(model);
  }
}
