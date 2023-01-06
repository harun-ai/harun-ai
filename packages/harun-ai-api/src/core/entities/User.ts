import { Entity } from './Entity';
import Model from './Model';

export default class User extends Entity<User> {
  name?: string;
  email?: string;
  models?: Model[];
}
