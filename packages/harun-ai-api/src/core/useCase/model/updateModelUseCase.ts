import ISchemaProvider from '../../../provider/schemaProvider/ISchemaProvider';
import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import InvalidInputSchemaError from '../../errors/InvalidInputSchemaError';
import IUseCase from '../IUseCase';

export type UpdateModelUseCaseDTO = {
  Request: {
    params: Partial<Omit<Model, 'id' | 'createdAt' | 'updatedAt' | 'name'>>;
    modelId: Model['id'];
  };
  Response: Model;
};

export default class UpdateModelUseCase
  implements IUseCase<UpdateModelUseCaseDTO>
{
  constructor(
    private modelRepository: IModelRepository,
    private schemaProvider: ISchemaProvider
  ) {}
  async use({
    params,
    modelId,
  }: UpdateModelUseCaseDTO['Request']): Promise<Model> {
    const model = await this.modelRepository.get(modelId);

    if (params.inputSchema) {
      try {
        await this.schemaProvider.validateSchema(params.inputSchema);
      } catch (error) {
        if (error instanceof Error)
          throw new InvalidInputSchemaError(error.message);

        throw new InvalidInputSchemaError();
      }
    }

    model.update(params);

    return this.modelRepository.update(model);
  }
}
