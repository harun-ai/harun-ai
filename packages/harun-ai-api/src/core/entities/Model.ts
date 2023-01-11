import User from './User';

export default class Model {
  id: string;
  createdAt = new Date();
  updatedAt = new Date();
  active = true;
  name: string;
  model: string;
  description: string;
  inputSchema: any;
  prompt: string;
  temperature: number | null;
  maxTokens: number | null;
  topP: number | null;
  frequencyPenalty: number | null;
  presencePenalty: number | null;
  userId: User['id'];
  User?: User;

  constructor(params: Omit<Model, 'createdAt' | 'updatedAt' | 'active'>) {
    Object.assign(this, params);
  }
}
