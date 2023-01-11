export default class Entity {
  static update<T extends object>(params: Partial<T>, entity: T) {
    params['updatedAt'] = new Date();
    Object.assign(params, entity);
  }
}
