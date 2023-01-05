import IdProvider from '../../provider/idProvider/IdProvider';
import { Entity } from './Entity';
import User from './User';

export default class Model<IdType> extends Entity<IdType> {
  constructor(
    idProvider: IdProvider<IdType>,
    source: Omit<Model<IdType>, 'id'>
  ) {
    super(idProvider);
    Object.assign(this, source);
  }
  name?: string;
  description?: string;
  inputSchema?: object;
  text?: string;
  user?: User<IdType>;
}
