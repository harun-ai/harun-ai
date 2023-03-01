import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import UserNotFoundError from '../../../../../core/errors/UserNotFoundError';
import DeleteUserUseCase from '../../../../../core/useCase/user/deleteUserUseCase';
import { State } from '../../app';
import IService, { StatusCode } from '../IService';

export default class DeleteUserService implements IService<void> {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async execute(ctx: ParameterizedContext<State>): Promise<{
    success?: void | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      const params = await z
        .object({
          userId: z
            .string({ required_error: "'userId' is required" })
            .uuid('Invalid userId'),
        })
        .parseAsync(ctx.params);

      return {
        success: await this.deleteUserUseCase.use(params),
        statusCode: StatusCode.NO_CONTENT,
      };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.BAD_REQUEST,
        };
      } else if (error instanceof z.ZodError) {
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
