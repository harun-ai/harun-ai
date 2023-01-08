import User from '../../core/entities/User';

export default interface IUserRepository {
  save(user: User): Promise<User>;
  update(params: User): Promise<User>;
  delete(userId: User['id']): Promise<void>;
  get(userId: User['id']): Promise<User>;
  getAll(): Promise<Partial<User>[]>;
}
