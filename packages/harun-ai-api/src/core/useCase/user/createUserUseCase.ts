import IOneWayEncryptorProvider from '../../../provider/oneWayencryptorProvider/IOneWayEncryptorProvider';
import IdProvider from '../../../provider/idProvider/IdProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import User from '../../entities/User';
import IUseCase from '../IUseCase';
import IEmailProvider from '../../../provider/emailProvider/IEmailProvider';
import { API_DOMAIN, API_EMAIL } from '../../../envConfig';
import ITwoWayEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ITwoWayEncryptorProvider';

export type CreateUserUseCaseDTO = {
  Request: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'verified'>;
  Response: Omit<User, 'password'>;
};

export default class CreateUserUseCase
  implements IUseCase<CreateUserUseCaseDTO>
{
  constructor(
    private userRepository: IUserRepository,
    private oneWayEncryptorProvider: IOneWayEncryptorProvider,
    private idProvider: IdProvider,
    private emailProvider: IEmailProvider,
    private twoWayEncryptorProvider: ITwoWayEncryptorProvider
  ) {}

  async use(
    request: CreateUserUseCaseDTO['Request']
  ): Promise<CreateUserUseCaseDTO['Response']> {
    if (request.password) {
      request.password = await this.oneWayEncryptorProvider.encrypt(
        request.password
      );
    }

    const id = await this.idProvider.generateId();

    const user = new User({ ...request, id });

    const { password, ...response } = await this.userRepository.save(user);

    const token = await this.twoWayEncryptorProvider.encrypt(response);

    this.emailProvider.sendEmail({
      to: request.email,
      from: API_EMAIL,
      subject: 'Bem vindo(a) ao Harun.ai',
      html: `<a href=${API_DOMAIN}/user/verify-email?token=${token}>VERIFICAR MEU EMAIL!!</a>`,
    });

    return response;
  }
}
