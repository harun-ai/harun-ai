import IdProvider from './IdProvider';
import { v4 as uuidV4 } from 'uuid';

export type IdType = string;

export default class UuidProvider implements IdProvider<IdType> {
  generateId(): IdType {
    return uuidV4();
  }
}
