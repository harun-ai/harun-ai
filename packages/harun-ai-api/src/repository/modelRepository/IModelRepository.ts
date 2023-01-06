import Model from '../../core/entities/Model';

export default interface IModelRepository {
  getAll(): Promise<Partial<Model>[]>;
  get(modelId: string): Promise<Model>;
  update(model: Partial<Omit<Model, 'id'>>): Promise<Model>;
  save(model: Omit<Model, 'id'>): Promise<Model>;
  delete(modelId: string): Promise<void>;
}
