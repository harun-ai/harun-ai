import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import UserNotFoundError from '../../../../../core/errors/UserNotFoundError';
import ForgotPasswordUseCase from '../../../../../core/useCase/user/forgotPasswordUseCase';
import { State } from '../../app';
import IService, { StatusCode } from '../IService';

export default class ForgotPasswordService implements IService<void> {
  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}

  async execute(ctx: ParameterizedContext<State>): Promise<{
    success?: void | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      const params = await z
        .object({
          email: z
            .string({ required_error: "'email' is required" })
            .email('Invalid email'),
        })
        .parseAsync(ctx.request.body);

      return {
        success: await this.forgotPasswordUseCase.use(params),
        statusCode: StatusCode.NO_CONTENT,
      };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return {
          success: void 0,
          statusCode: StatusCode.NO_CONTENT,
        };
      } else if (error instanceof z.ZodError) {
        return {
          error: {
            code: error.name,
            message: error.errors.map(error => error.message).join(', '),
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
