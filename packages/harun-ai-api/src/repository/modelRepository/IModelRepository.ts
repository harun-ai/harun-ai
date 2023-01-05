import Model from '../../core/entities/Model';

export default interface IModelRepository<IdType> {
  getAll(): Promise<Model<IdType>[]>;
  get(modelId: IdType): Promise<Model<IdType>>;
  update(model: Model<IdType>): Promise<Model<IdType>>;
  save(model: Model<IdType>): Promise<Model<IdType>>;
  delete(modelId: IdType): Promise<void>;
}
