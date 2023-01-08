import User from './User';

export default class Model {
  id: string;
  createdAt = new Date();
  updatedAt = new Date();
  private active = true;
  name: string;
  model: string;
  description: string;
  inputSchema: Record<string, unknown>;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  user?: Partial<User>;

  constructor(
    params: Omit<
      Model,
      | 'createdAt'
      | 'updatedAt'
      | 'update'
      | 'active'
      | 'update'
      | 'activate'
      | 'deactivate'
      | 'isActive'
    >
  ) {
    Object.assign(this, params);
  }

  update(
    params: Partial<
      Omit<
        Model,
        | 'createdAt'
        | 'updatedAt'
        | 'update'
        | 'update'
        | 'activate'
        | 'deactivate'
        | 'isActive'
      >
    >
  ) {
    this.updatedAt = new Date();
    Object.assign(this, params);
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  isActive(): boolean {
    return this.active;
  }
}
