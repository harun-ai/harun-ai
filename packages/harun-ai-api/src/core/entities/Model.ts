import IdProvider from '../../provider/idProvider/IdProvider';
import { Entity } from './Entity';
import User from './User';

export default class Model<IdType> extends Entity<IdType> {
  constructor(
    idProvider: IdProvider<IdType>,
    source: Omit<Model<IdType>, 'id'>
  ) {
    super(idProvider);
    Object.assign(this, source);
  }
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
  user?: User<IdType>;
}
