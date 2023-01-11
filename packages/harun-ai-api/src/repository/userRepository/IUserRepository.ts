import User from '../../core/entities/User';

export default interface IUserRepository {
  save(user: User): Promise<User>;
  update(params: Omit<User, 'password'>): Promise<User>;
  delete(userId: User['id']): Promise<void>;
  get(userId: User['id']): Promise<User>;
  getWithEmail(userEmail: string): Promise<User>;
  getAll(): Promise<Partial<User>[]>;
}
