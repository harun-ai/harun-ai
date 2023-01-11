import IEncryptorProvider from '../../../provider/oneWayencryptorProvider/IOneWayEncryptorProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import Entity from '../../entities/Entity';
import User from '../../entities/User';
import UserPasswordDoNotMatchError from '../../errors/UserPasswordDoNotMatchError';
import IUseCase from '../IUseCase';

export type UpdateUserUseCaseDTO = {
  Request: {
    params: Partial<Omit<User, 'id' | 'UpdatedAt' | 'updatedAt'>>;
    userId: User['id'];
    userPassword: string;
  };
  Response: Omit<User, 'password'>;
};

export default class UpdateUserUseCase
  implements IUseCase<UpdateUserUseCaseDTO>
{
  constructor(
    private userRepository: IUserRepository,
    private encryptorProvider: IEncryptorProvider
  ) {}

  async use({
    params,
    userId,
    userPassword,
  }: UpdateUserUseCaseDTO['Request']): Promise<
    UpdateUserUseCaseDTO['Response']
  > {
    const user = await this.userRepository.get(userId);

    const validPassword = await this.encryptorProvider.compare(
      userPassword,
      user.password as string
    );

    if (!validPassword)
      throw new UserPasswordDoNotMatchError('Password do not match');

    if (params.email) {
      user.verified = false;
    }

    Entity.update(params, user);

    const { password: _, ...updatedUser } = await this.userRepository.update(
      user
    );

    return updatedUser;
  }
}
