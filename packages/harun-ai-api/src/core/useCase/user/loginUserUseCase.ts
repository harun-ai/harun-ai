import IOneWayEncryptorProvider from '../../../provider/oneWayencryptorProvider/IOneWayEncryptorProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import User from '../../entities/User';
import InvalidUserCreadentialsError from '../../errors/InvalidUserCreadentialsError';
import UnverifiedUserError from '../../errors/UnverifiedUserError';
import UserHasNoPasswordError from '../../errors/UserHasNoPasswordError';
import IUseCase from '../IUseCase';

export type LoginUserUseCaseDTO = {
  Request: {
    email: string;
    password: string;
  };
  Response: Omit<User, 'password'>;
};

export default class LoginUserUseCase implements IUseCase<LoginUserUseCaseDTO> {
  constructor(
    private userRepository: IUserRepository,
    private oneWayEncryptorProvider: IOneWayEncryptorProvider
  ) {}

  async use({
    email,
    password,
  }: LoginUserUseCaseDTO['Request']): Promise<LoginUserUseCaseDTO['Response']> {
    const { password: userPassword, ...user } =
      await this.userRepository.getWithEmail(email);

    if (!userPassword) {
      throw new UserHasNoPasswordError('Ivalid email and/or password');
    }

    if (!user.verified) {
      throw new UnverifiedUserError(`User email: ${email} is not verified`);
    }

    const isValidPassword = await this.oneWayEncryptorProvider.compare(
      password,
      userPassword
    );

    if (!isValidPassword) {
      throw new InvalidUserCreadentialsError('Ivalid email and/or password');
    }

    return user;
  }
}
