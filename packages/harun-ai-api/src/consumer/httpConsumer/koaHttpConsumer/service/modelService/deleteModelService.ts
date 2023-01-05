import { ParameterizedContext } from 'koa';
import DeleteModelUseCase from 'packages/harun-ai-api/src/core/useCase/model/deleteModelUseCase';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class DeleteModelService<IdType> implements IService<void> {
  constructor(private deleteModelUseCase: DeleteModelUseCase<IdType>) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<void>['Response']> {
    const modelId = ctx.params.modelId;

    if (!modelId) {
      return {
        error: 'Model id is required',
        statusCode: StatusCode.BAD_REQUEST,
      };
    }

    try {
      return {
        success: await this.deleteModelUseCase.use({ modelId }),
        statusCode: StatusCode.NO_CONTENT,
      };
    } catch (error) {
      if (error instanceof ModelNotFoundError) {
        return {
          error: error.message,
          statusCode: StatusCode.NOT_FOUND,
        };
      }
      return {
        error: 'Unexpect error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
