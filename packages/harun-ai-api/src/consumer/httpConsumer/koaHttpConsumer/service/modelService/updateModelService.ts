import { ParameterizedContext } from 'koa';
import InvalidInputSchemaError from 'packages/harun-ai-api/src/core/errors/InvalidInputSchemaError';
import Model from '../../../../../core/entities/Model';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import UpdateModelUseCase from '../../../../../core/useCase/model/updateModelUseCase';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class UpdateModelService<IdType>
  implements IService<Model<IdType>>
{
  constructor(private updateModelUseCase: UpdateModelUseCase<IdType>) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<Model<IdType>>['Response']> {
    const model = ctx.request.body as Model<IdType>;

    if (!model.id) {
      return {
        error: 'Model id is required',
        statusCode: StatusCode.BAD_REQUEST,
      };
    }

    try {
      return {
        success: await this.updateModelUseCase.use(model),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      if (error instanceof ModelNotFoundError) {
        return {
          error: error.message,
          statusCode: StatusCode.NOT_FOUND,
        };
      } else if (error instanceof InvalidInputSchemaError) {
        return {
          error: error.message,
          statusCode: StatusCode.BAD_REQUEST,
        };
      }
      return {
        error: 'Unexpect error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
