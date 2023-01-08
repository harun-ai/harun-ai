import IEncryptorProvider from '../../../provider/encryptorProvider/IEncryptorProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import User from '../../entities/User';
import UserPasswordDoNotMatchError from '../../errors/UserPasswordDoNotMatchError';
import IUseCase from '../IUseCase';

export type UpdateUserUseCaseDTO = {
  Request: {
    params: Partial<Omit<User, 'id' | 'UpdatedAt' | 'updatedAt' | 'password'>>;
    userId: User['id'];
    userPassword: string;
  };
  Response: User;
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
  }: UpdateUserUseCaseDTO['Request']): Promise<User> {
    const user = await this.userRepository.get(userId);

    const validPassword = await this.encryptorProvider.compare(
      userPassword,
      user.password as string
    );

    delete user.password;

    if (!validPassword)
      throw new UserPasswordDoNotMatchError('Password do not match');

    if (params.email) {
      user.setUnverified();
    }

    user.update(params);

    const updatedUser = await this.userRepository.update(user);

    delete updatedUser.password;

    return updatedUser;
  }
}
