import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import InvalidUserCreadentialsError from '../../../../../core/errors/InvalidUserCreadentialsError';
import UnverifiedUserError from '../../../../../core/errors/UnverifiedUserError';
import UserHasNoPasswordError from '../../../../../core/errors/UserHasNoPasswordError';
import UserNotFoundError from '../../../../../core/errors/UserNotFoundError';
import LoginUserUseCase from '../../../../../core/useCase/user/loginUserUseCase';
import ITwoWayEncryptorProvider from '../../../../../provider/twoWayEncrytorProvider/ITwoWayEncryptorProvider';
import { State } from '../../app';
import IService, { ServiceDTO, StatusCode } from '../IService';

export type ResponseType = string;

export default class LoginUserService implements IService<ResponseType> {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
    private twoWayEncryptorProvider: ITwoWayEncryptorProvider
  ) {}

  async execute(
    ctx: ParameterizedContext<State>
  ): Promise<ServiceDTO<ResponseType>['Response']> {
    try {
      const params = await z
        .object({
          email: z
            .string({ required_error: "'email' is required" })
            .email('Invalid email'),
          password: z.string({ required_error: "'password' is required" }),
        })
        .parseAsync(ctx.request.body);

      const user = await this.loginUserUseCase.use(params);

      return {
        success: await this.twoWayEncryptorProvider.encrypt(user),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        const newError = new InvalidUserCreadentialsError(
          'Invalid email and/or password'
        );
        return {
          error: { code: newError.name, message: newError.message },
          statusCode: StatusCode.BAD_REQUEST,
        };
      } else if (error instanceof UserHasNoPasswordError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.BAD_REQUEST,
        };
      } else if (error instanceof UnverifiedUserError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.BAD_REQUEST,
        };
      } else if (error instanceof InvalidUserCreadentialsError) {
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
