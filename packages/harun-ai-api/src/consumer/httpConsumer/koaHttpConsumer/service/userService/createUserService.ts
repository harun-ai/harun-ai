import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import User from '../../../../../core/entities/User';
import UserAlreadyExistsError from '../../../../../core/errors/UserAlreadyExistsError';
import CreateUserUseCase from '../../../../../core/useCase/user/createUserUseCase';
import { State } from '../../app';
import IService, { StatusCode } from '../IService';

export type ResponseType = Omit<User, 'password'>;

export default class CreateUserService implements IService<ResponseType> {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(ctx: ParameterizedContext<State>): Promise<{
    success?: ResponseType | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      const params = await z
        .object({
          email: z
            .string({ required_error: "'email' is required" })
            .email("'email' is invalid"),
          name: z.string({ required_error: "'name' is required" }),
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
        success: await this.createUserUseCase.use(params),
        statusCode: StatusCode.CREATED,
      };
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
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
