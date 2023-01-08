import Model from '../../core/entities/Model';

export default interface IModelRepository {
  getAll(): Promise<Partial<Model>[]>;
  get(modelId: Model['id']): Promise<Model>;
  update(model: Model): Promise<Model>;
  save(model: Model): Promise<Model>;
  delete(modelId: Model['id']): Promise<void>;
}
