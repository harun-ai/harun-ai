import Model from '../../core/entities/Model';

export default interface IModelRepository<IdType> {
  getAll(): Promise<Model<IdType>[]>;
  get(modelId: IdType): Promise<Model<IdType>>;
}
