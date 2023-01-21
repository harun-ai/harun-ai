import Model from './Model';
import Prediction from './Prediction';

export default class User {
  id: string;
  createdAt = new Date();
  updatedAt = new Date();
  verified = false;
  name: string;
  email: string;
  password: string | null;
  models?: Partial<Model>[];
  predictions?: Partial<Prediction>[];

  constructor(params: Omit<User, 'createdAt' | 'updatedAt' | 'verified'>) {
    Object.assign(this, params);
  }
}
