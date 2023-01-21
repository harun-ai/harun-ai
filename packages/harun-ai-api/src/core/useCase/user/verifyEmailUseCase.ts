import { User } from '@prisma/client';
import ITwoWayEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ITwoWayEncryptorProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import Entity from '../../entities/Entity';
import InvalidTokenError from '../../errors/InvalidTokenError';
import IUseCase from '../IUseCase';

export type VerifyEmailUseCaseDTO = {
  Request: {
    token: string;
  };
  Response: Omit<User, 'password'>;
};

export default class VerifyEmailUseCase
  implements IUseCase<VerifyEmailUseCaseDTO>
{
  constructor(
    private userRepository: IUserRepository,
    private twoWayEncryptorProvider: ITwoWayEncryptorProvider
  ) {}
  async use({
    token,
  }: VerifyEmailUseCaseDTO['Request']): Promise<
    VerifyEmailUseCaseDTO['Response']
  > {
    const { id: userId }: Omit<User, 'password'> =
      await this.twoWayEncryptorProvider.decrypt(token);

    if (!userId) {
      throw new InvalidTokenError('Token is invalid or expired');
    }

    const { password, ...user } = await this.userRepository.get(userId);

    Entity.update({ verified: true }, user);

    await this.userRepository.update(user);

    return user;
  }
}
