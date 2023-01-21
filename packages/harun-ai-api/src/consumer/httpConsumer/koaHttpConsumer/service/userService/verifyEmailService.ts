import { User } from '@prisma/client';
import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import InvalidTokenError from '../../../../../core/errors/InvalidTokenError';
import UserNotFoundError from '../../../../../core/errors/UserNotFoundError';
import VerifyEmailUseCase from '../../../../../core/useCase/user/verifyEmailUseCase';
import { State } from '../../app';
import IService, { StatusCode } from '../IService';

export type ResponseType = Omit<User, 'password'>;

export default class VerifyEmailService implements IService<ResponseType> {
  constructor(private verifyEmailUseCase: VerifyEmailUseCase) {}

  async execute(ctx: ParameterizedContext<State>): Promise<{
    success?: ResponseType | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      const params = await z
        .object({
          token: z.string({ required_error: "'token' is required" }),
        })
        .parseAsync(ctx.query);

      return {
        success: await this.verifyEmailUseCase.use(params),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.BAD_REQUEST,
        };
      } else if (error instanceof InvalidTokenError) {
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
