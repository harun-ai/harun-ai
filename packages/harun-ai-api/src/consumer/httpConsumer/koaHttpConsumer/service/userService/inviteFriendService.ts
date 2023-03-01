import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import InviteFriendUseCase from '../../../../../core/useCase/user/inviteFriendUseCase';
import { State } from '../../app';
import IService, { StatusCode } from '../IService';

export default class InviteFriendService implements IService<void> {
  constructor(private inviteFriendUseCase: InviteFriendUseCase) {}

  async execute(ctx: ParameterizedContext<State>): Promise<{
    success?: void | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      const params = await z
        .object({
          friendEmail: z
            .string({ required_error: "'email' is required" })
            .email('Invalid email'),
        })
        .parseAsync(ctx.request.body);

      return {
        success: await this.inviteFriendUseCase.use({
          ...params,
          userName: ctx.state.user?.name as string,
        }),
        statusCode: StatusCode.NO_CONTENT,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          error: {
            code: error.name,
            message: error.errors
              .map(error => `${error.path}: ${error.message}`)
              .join(', '),
          },
          statusCode: StatusCode.BAD_REQUEST,
        };
      }

      console.error(error);

      return {
        error: { code: 'INTERNAL_SERVER_ERROR', message: 'Unexpect error' },
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
