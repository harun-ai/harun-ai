import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import InvalidTokenError from '../../../../../core/errors/InvalidTokenError';
import UserNotFoundError from '../../../../../core/errors/UserNotFoundError';
import ResetPasswordUseCase from '../../../../../core/useCase/user/resetPasswordUseCase';
import { State } from '../../app';
import IService, { StatusCode } from '../IService';

export default class ResetPasswordService implements IService<void> {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  async execute(ctx: ParameterizedContext<State>): Promise<{
    success?: void | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      const params = await z
        .object({
          token: z.string({ required_error: "'token' is required" }),
          password: z
            .string({ required_error: "'password' is required" })
            .regex(
              new RegExp(
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
              ),
              "'password' Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            ),
        })
        .parseAsync(ctx.request.body);

      return {
        success: await this.resetPasswordUseCase.use(params),
        statusCode: StatusCode.NO_CONTENT,
      };
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.BAD_REQUEST,
        };
      } else if (error instanceof UserNotFoundError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.BAD_REQUEST,
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
