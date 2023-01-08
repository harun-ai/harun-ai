import { v4 as uuidV4 } from 'uuid';
import IdProvider from './IdProvider';

export default class UuidProvider implements IdProvider {
  async generateId(): Promise<string> {
    return uuidV4();
  }
}
