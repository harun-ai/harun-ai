import { MailService } from '@sendgrid/mail';
import FailedToSendEmailError from '../../core/errors/FailedToSendEmailError';

import IEmailProvider, { sendEmailDTO } from './IEmailProvider';

export default class SendgridEmailProvider implements IEmailProvider {
  client: MailService;

  constructor(apiKey: string) {
    this.client = new MailService();
    this.client.setApiKey(apiKey);
  }

  async sendEmail(
    params: sendEmailDTO['Input']
  ): Promise<sendEmailDTO['Output']> {
    try {
      await this.client.send(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new FailedToSendEmailError(error.message);
      }

      throw error;
    }
  }
}
