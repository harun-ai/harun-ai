import { v4 as uuidV4 } from 'uuid';

import { Entity } from './Entity';
import Model from './Model';

export default class User extends Entity {
  name?: string;
  email?: string;
  models?: Model[];

  constructor(
    source: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string
  ) {
    super();
    const date = new Date();

    if (!id) {
      this.id = uuidV4();
      this.createdAt = date;
      this.updatedAt = date;
    } else {
      this.updatedAt = date;
    }

    Object.assign(this, source);
  }
}
