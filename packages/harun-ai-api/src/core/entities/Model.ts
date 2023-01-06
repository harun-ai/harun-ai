import { Entity } from './Entity';
import User from './User';

export default class Model extends Entity<Model> {
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
}
