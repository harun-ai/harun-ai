import { ParameterizedContext } from 'koa';
import z from 'zod';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import DeleteModelUseCase from '../../../../../core/useCase/model/deleteModelUseCase';
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
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.NOT_FOUND,
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
