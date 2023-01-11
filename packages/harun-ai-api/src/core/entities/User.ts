import Model from './Model';

export default class User {
  id: string;
  createdAt = new Date();
  updatedAt = new Date();
  verified = false;
  name: string;
  email: string;
  password: string | null;
  models?: Partial<Model>[];

  constructor(params: Omit<User, 'createdAt' | 'updatedAt' | 'verified'>) {
    Object.assign(this, params);
  }
}
