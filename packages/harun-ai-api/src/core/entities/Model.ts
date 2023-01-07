import { v4 as uuidV4 } from 'uuid';

import { Entity } from './Entity';
import User from './User';

export default class Model extends Entity {
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
  user?: User;

  constructor(
    source: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string
  ) {
    super();
    const date = new Date();

    if (!id) {
      this.id = uuidV4();
      this.createdAt = date;
      this.updatedAt = date;
    } else {
      this.updatedAt = date;
    }

    Object.assign(this, source);
  }
}
