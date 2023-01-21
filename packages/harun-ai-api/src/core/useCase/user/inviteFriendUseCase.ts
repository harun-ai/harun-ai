import { API_EMAIL } from '../../../envConfig';
import IEmailProvider from '../../../provider/emailProvider/IEmailProvider';
import ITwoWayEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ITwoWayEncryptorProvider';
import IUseCase from '../IUseCase';

export type InviteFriendUseCaseDTO = {
  Request: {
    friendEmail: string;
    userName: string;
  };
  Response: void;
};

export default class InviteFriendUseCase
  implements IUseCase<InviteFriendUseCaseDTO>
{
  constructor(private emailProvider: IEmailProvider) {}

  async use({
    friendEmail,
    userName,
  }: InviteFriendUseCaseDTO['Request']): Promise<
    InviteFriendUseCaseDTO['Response']
  > {
    this.emailProvider.sendEmail({
      from: API_EMAIL,
      to: friendEmail,
      subject: `${userName} convidou você para o Harun.ai`,
      text: friendEmail,
    });
  }
}
