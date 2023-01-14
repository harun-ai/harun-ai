import { User } from '@prisma/client';
import IOneWayEncryptorProvider from '../../../provider/oneWayencryptorProvider/IOneWayEncryptorProvider';
import ITwoWayEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ITwoWayEncryptorProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import Entity from '../../entities/Entity';
import InvalidTokenError from '../../errors/InvalidTokenError';
import IUseCase from '../IUseCase';

export type ResetPasswordUseCaseDTO = {
  Request: {
    token: string;
    password: string;
  };
  Response: void;
};

export default class ResetPasswordUseCase
  implements IUseCase<ResetPasswordUseCaseDTO>
{
  constructor(
    private twoWayEncryptorProvider: ITwoWayEncryptorProvider,
    private userRepository: IUserRepository,
    private oneWayEncryptorProvider: IOneWayEncryptorProvider
  ) {}

  async use({
    token,
    password,
  }: ResetPasswordUseCaseDTO['Request']): Promise<
    ResetPasswordUseCaseDTO['Response']
  > {
    const params: Omit<User, 'password'> =
      await this.twoWayEncryptorProvider.decrypt(token);

    if (!params.id) {
      throw new InvalidTokenError('Token invalid or expired');
    }

    const user = await this.userRepository.get(params.id);

    const encryptedPassword = await this.oneWayEncryptorProvider.encrypt(
      password
    );

    Entity.update({ password: encryptedPassword }, user);

    await this.userRepository.update(user);
  }
}
