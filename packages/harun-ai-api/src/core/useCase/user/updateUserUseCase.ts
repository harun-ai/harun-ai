import { API_DOMAIN, API_EMAIL } from '../../../envConfig';
import IEmailProvider from '../../../provider/emailProvider/IEmailProvider';
import IOneWayEncryptorProvider from '../../../provider/oneWayencryptorProvider/IOneWayEncryptorProvider';
import ITwoWayEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ITwoWayEncryptorProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import Entity from '../../entities/Entity';
import User from '../../entities/User';
import UserPasswordDoNotMatchError from '../../errors/UserPasswordDoNotMatchError';
import IUseCase from '../IUseCase';

export type UpdateUserUseCaseDTO = {
  Request: {
    params: Partial<Omit<User, 'id' | 'updatedAt'>>;
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
    private encryptorProvider: IOneWayEncryptorProvider,
    private emailProvider: IEmailProvider,
    private twoWayEncryptorProvider: ITwoWayEncryptorProvider
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

    if (params.password) {
      params.password = await this.encryptorProvider.encrypt(params.password);
    }

    Entity.update(params, user);

    if (params.email) user.verified = false;

    const { password: _, ...updatedUser } = await this.userRepository.update(
      user
    );

    if (params.email) {
      const token = await this.twoWayEncryptorProvider.encrypt(updatedUser);

      this.emailProvider.sendEmail({
        to: params.email,
        from: API_EMAIL,
        subject: 'Bem vindo(a) ao Harun.ai',
        html: `<a href=${API_DOMAIN}/user/verify-email?token=${token}>VERIFICAR MEU EMAIL!!</a>`,
      });
    }

    return updatedUser;
  }
}
