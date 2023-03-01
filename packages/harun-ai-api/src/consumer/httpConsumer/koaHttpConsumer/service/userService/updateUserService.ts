import { User } from '@prisma/client';
import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import UserAlreadyExistsError from '../../../../../core/errors/UserAlreadyExistsError';
import UserNotFoundError from '../../../../../core/errors/UserNotFoundError';
import UserPasswordDoNotMatchError from '../../../../../core/errors/UserPasswordDoNotMatchError';
import UpdateUserUseCase from '../../../../../core/useCase/user/updateUserUseCase';
import { State } from '../../app';
import IService, { StatusCode } from '../IService';

export type ResponseType = Omit<User, 'password'>;

export default class UpdateUserService implements IService<ResponseType> {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async execute(ctx: ParameterizedContext<State>): Promise<{
    success?: ResponseType | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      const { actualPassword: userPassword, ...params } = await z
        .object({
          email: z.string().email('Invalid email').optional(),
          name: z.string().optional(),
          password: z
            .string()
            .regex(
              new RegExp(
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
              ),
              "'password' Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            )
            .optional(),
          actualPassword: z.string({
            required_error: "'actualPassword' is required",
          }),
        })
        .parseAsync(ctx.request.body);

      const { userId } = await z
        .object({
          userId: z
            .string({ required_error: "'userId' is required" })
            .uuid('Invalid id'),
        })
        .parseAsync(ctx.params);

      return {
        success: await this.updateUserUseCase.use({
          params,
          userId,
          userPassword,
        }),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof UserAlreadyExistsError ||
        error instanceof UserPasswordDoNotMatchError
      ) {
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
