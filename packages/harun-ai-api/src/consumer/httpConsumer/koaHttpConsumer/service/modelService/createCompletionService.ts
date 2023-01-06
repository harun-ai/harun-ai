import { ParameterizedContext } from 'koa';
import z from 'zod';

import InvalidInputParamsError from 'packages/harun-ai-api/src/core/errors/InvalidInputParamsError';
import CreateCompletionUseCase from 'packages/harun-ai-api/src/core/useCase/model/createCompletionUseCase';
import Model from '../../../../../core/entities/Model';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class CreateCompletionService implements IService<Model> {
  constructor(private createCompletionUseCase: CreateCompletionUseCase) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<Model>['Response']> {
    try {
      const params = await z
        .object({
          modelId: z
            .string({ required_error: "'modelId' is required asdads" })
            .uuid("invalid 'modelId'"),
          inputs: z.record(z.unknown(), {
            required_error: "'inputs' is required",
          }),
        })
        .parseAsync(ctx.request.body);

      return {
        success: await this.createCompletionUseCase.use(params),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      if (error instanceof ModelNotFoundError) {
        return {
          error: error.message,
          statusCode: StatusCode.NOT_FOUND,
        };
      } else if (error instanceof InvalidInputParamsError) {
        return {
          error: error.message,
          statusCode: StatusCode.BAD_REQUEST,
        };
      } else if (error instanceof z.ZodError) {
        return {
          error: error.errors.map(error => error.message).join(', '),
          statusCode: StatusCode.BAD_REQUEST,
        };
      }
      console.error(error);
      return {
        error: 'Unexpect error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
