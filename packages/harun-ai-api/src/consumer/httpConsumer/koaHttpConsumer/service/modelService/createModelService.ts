import { ParameterizedContext } from 'koa';
import InvalidInputSchemaError from 'packages/harun-ai-api/src/core/errors/InvalidInputSchemaError';
import ModelAlreadyExistsError from 'packages/harun-ai-api/src/core/errors/ModelAlreadyExistsError';
import CreateModelUseCase from 'packages/harun-ai-api/src/core/useCase/model/createModelUseCase';
import Model from '../../../../../core/entities/Model';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class CreateModelService<IdType>
  implements IService<Model<IdType>>
{
  constructor(private createModelUseCase: CreateModelUseCase<IdType>) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<Model<IdType>>['Response']> {
    const model = ctx.request.body as Model<IdType>;

    try {
      return {
        success: await this.createModelUseCase.use(model),
        statusCode: StatusCode.CREATED,
      };
    } catch (error) {
      if (error instanceof ModelAlreadyExistsError) {
        return {
          error: error.message,
          statusCode: StatusCode.BAD_REQUEST,
        };
      } else if (error instanceof InvalidInputSchemaError) {
        return {
          error: error.message,
          statusCode: StatusCode.BAD_REQUEST,
        };
      }
      console.log(error.message);
      return {
        error: 'Unexpect error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
