import User from './User';
import Model from './Model';

export default class Prediction {
  id: string;
  createdAt = new Date();
  result: string;
  inputs: any;
  modelId: Model['id'];
  model?: Partial<Model>;
  userId: User['id'];
  user?: Partial<User>;
  liked: boolean | null;

  constructor(params: Omit<Prediction, 'createdAt'>) {
    Object.assign(this, params);
  }
}
