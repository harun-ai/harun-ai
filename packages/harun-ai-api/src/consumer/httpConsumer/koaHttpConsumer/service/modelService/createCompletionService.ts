import { ParameterizedContext } from 'koa';
import z from 'zod';

import InvalidInputParamsError from '../../../../../core/errors/InvalidInputParamsError';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import UserNotFoundError from '../../../../../core/errors/UserNotFoundError';
import CreateCompletionUseCase from '../../../../../core/useCase/model/createCompletionUseCase';
import { State } from '../../app';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class CreateCompletionService implements IService<unknown> {
  constructor(private createCompletionUseCase: CreateCompletionUseCase) {}
  async execute(
    ctx: ParameterizedContext<State>
  ): Promise<ServiceDTO<unknown>['Response']> {
    try {
      const inputs = await z
        .record(z.unknown(), {
          required_error: "'params' is required",
        })
        .parseAsync(ctx.request.body);

      const { modelId } = await z
        .object({
          modelId: z
            .string({ required_error: "'modelId' is required asdads" })
            .uuid("invalid 'modelId'"),
        })
        .parseAsync(ctx.params);

      const userId = ctx.state.user?.id;

      if (!userId) throw new UserNotFoundError();

      return {
        success: await this.createCompletionUseCase.use({
          modelId,
          inputs,
          userId,
        }),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      if (error instanceof ModelNotFoundError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.NOT_FOUND,
        };
      } else if (error instanceof InvalidInputParamsError) {
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
