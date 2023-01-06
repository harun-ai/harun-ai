import { ParameterizedContext } from 'koa';
import z from 'zod';
import DeleteModelUseCase from 'packages/harun-ai-api/src/core/useCase/model/deleteModelUseCase';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class DeleteModelService implements IService<void> {
  constructor(private deleteModelUseCase: DeleteModelUseCase) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<void>['Response']> {
    try {
      const params = await z
        .object({
          modelId: z
            .string({ required_error: "'modelId' is required" })
            .uuid("Invalid 'modelId'"),
        })
        .parseAsync(ctx.params);

      return {
        success: await this.deleteModelUseCase.use(params),
        statusCode: StatusCode.NO_CONTENT,
      };
    } catch (error) {
      if (error instanceof ModelNotFoundError) {
        return {
          error: error.message,
          statusCode: StatusCode.NOT_FOUND,
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
