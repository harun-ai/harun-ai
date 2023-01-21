export type sendEmailDTO = {
  Input: {
    to: string;
    from: string;
    subject: string;
  } & ({ text: string } | { html: string } | { templateId: string });
  Output: void;
};

export default interface IEmailProvider {
  sendEmail(params: sendEmailDTO['Input']): Promise<sendEmailDTO['Output']>;
}
