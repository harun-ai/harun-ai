import { API_EMAIL } from '../../../envConfig';
import IEmailProvider from '../../../provider/emailProvider/IEmailProvider';
import ITwoWayEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ITwoWayEncryptorProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import IUseCase from '../IUseCase';

export type ForgotPasswordUseCaseDTO = {
  Request: {
    email: string;
  };
  Response: void;
};

export default class ForgotPasswordUseCase
  implements IUseCase<ForgotPasswordUseCaseDTO>
{
  constructor(
    private userRepository: IUserRepository,
    private twoWayEncryptorProvider: ITwoWayEncryptorProvider,
    private emailProvider: IEmailProvider
  ) {}
  async use({
    email,
  }: ForgotPasswordUseCaseDTO['Request']): Promise<
    ForgotPasswordUseCaseDTO['Response']
  > {
    const { password, ...user } = await this.userRepository.getWithEmail(email);

    const token = await this.twoWayEncryptorProvider.encrypt(user);

    this.emailProvider.sendEmail({
      to: email,
      from: API_EMAIL,
      subject: 'Harun.ai recuperação de senha',
      text: token,
    });
  }
}
