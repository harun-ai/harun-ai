import IdProvider from '../../provider/idProvider/IdProvider';

export abstract class Entity<IdType> {
  id: IdType;
  createdAt?: Date;
  updatedAT?: Date;

  constructor(idProvider: IdProvider<IdType>, id?: IdType) {
    const date = new Date();

    if (!id) {
      this.id = idProvider.generateId();
      this.createdAt = date;
      this.updatedAT = date;
    } else {
      this.id = id;
      this.updatedAT = date;
    }
  }
}
