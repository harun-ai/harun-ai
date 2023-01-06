import { v4 as uuidV4 } from 'uuid';

import { Entity } from './Entity';
import Model from './Model';

export default class User extends Entity {
  name?: string;
  email?: string;
  models?: Model[];

  constructor(
    source: Omit<Model, 'id' | 'createdAt' | 'updatedAT'>,
    id?: string
  ) {
    super();
    const date = new Date();

    if (!id) {
      this.id = uuidV4();
      this.createdAt = date;
      this.updatedAT = date;
    } else {
      this.updatedAT = date;
    }

    Object.assign(this, source);
  }
}
