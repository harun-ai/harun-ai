import { sealData, unsealData } from 'iron-session';
import ITwoWayEncryptorProvider from './ITwoWayEncryptorProvider';

export default class IronSessionEncryptorProvider
  implements ITwoWayEncryptorProvider
{
  private sealData = sealData;
  private unsealData = unsealData;
  private ttl = 60 * 60 * 24; // 1 day

  constructor(private apiSecretKey: string) {}

  async encrypt<ParamType>(param: ParamType): Promise<string> {
    return await this.sealData(param, {
      password: this.apiSecretKey,
      ttl: this.ttl,
    });
  }
  async decrypt<ParamType>(encrypted: string): Promise<ParamType> {
    return await this.unsealData(encrypted, {
      password: this.apiSecretKey,
      ttl: this.ttl,
    });
  }
}
