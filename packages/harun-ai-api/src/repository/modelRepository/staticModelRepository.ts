import Model from '../../core/entities/Model';
import ModelNotFoundError from '../../core/errors/ModelNotFoundError';
import IdProvider from '../../provider/idProvider/IdProvider';
import IModelRepository from './IModelRepository';

export default class StaticModelRepository<IdType>
  implements IModelRepository<IdType>
{
  private models: Model<IdType>[] = [];

  constructor(private idProvider: IdProvider<IdType>) {
    for (let i = 0; i < 20; i++) {
      this.models.push(
        new Model(this.idProvider, { text: `Some text ${i + 1}` })
      );
    }
  }

  async getAll(): Promise<Model<IdType>[]> {
    return this.models;
  }

  async get(modelId: IdType): Promise<Model<IdType>> {
    const model = this.models.find(model => model.id === modelId);

    if (model) {
      return model;
    }
    throw new ModelNotFoundError(`Model id: ${modelId} not found`);
  }
}
