import { ParameterizedContext } from 'koa';
import Model from '../../../../../core/entities/Model';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import GetModelUseCase from '../../../../../core/useCase/model/getModelUseCase';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class GetModelService<IdType>
  implements IService<Model<IdType>>
{
  constructor(private getModelUseCase: GetModelUseCase<IdType>) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<Model<IdType>>['Response']> {
    const modelId = ctx.params.modelId;

    if (!modelId) {
      return {
        error: 'Model id is required',
        statusCode: StatusCode.BAD_REQUEST,
      };
    }

    try {
      return {
        success: await this.getModelUseCase.use({ modelId }),
        statusCode: StatusCode.OK,
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
