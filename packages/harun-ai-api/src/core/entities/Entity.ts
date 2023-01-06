import { v4 as uuidV4 } from 'uuid';

export abstract class Entity<C> {
  id: string;
  createdAt: Date;
  updatedAT: Date;

  constructor(source: Omit<C, 'id' | 'createdAt' | 'updatedAT'>, id?: string) {
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
