import bcrypt from 'bcrypt';

import IOneWayEncryptorProvider from './IOneWayEncryptorProvider';

export default class BcryptEncriptorProvider
  implements IOneWayEncryptorProvider
{
  async encrypt(param: string): Promise<string> {
    return await bcrypt.hash(param, 10);
  }
  async compare(param: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(param, encrypted);
  }
}
