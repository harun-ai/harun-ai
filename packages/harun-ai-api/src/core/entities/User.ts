import { Entity } from './Entity';
import Model from './Model';

export default class User<IdType> extends Entity<IdType> {
  name?: string;
  email?: string;
  models?: Model<IdType>[];
}
