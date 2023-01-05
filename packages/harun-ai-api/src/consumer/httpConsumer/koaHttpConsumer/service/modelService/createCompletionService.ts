import { ParameterizedContext } from 'koa';
import InvalidInputParamsError from 'packages/harun-ai-api/src/core/errors/InvalidInputParamsError';
import CreateCompletionUseCase from 'packages/harun-ai-api/src/core/useCase/model/createCompletionUseCase';
import Model from '../../../../../core/entities/Model';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class CreateCompletionService<IdType>
  implements IService<Model<IdType>>
{
  constructor(
    private createCompletionUseCase: CreateCompletionUseCase<IdType>
  ) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<Model<IdType>>['Response']> {
    type Input = {
      modelId: IdType;
      inputs: Record<string, unknown>;
    };

    const params = ctx.request.body as Input;

    if (!params.modelId) {
      return {
        error: 'Model id is required',
        statusCode: StatusCode.BAD_REQUEST,
      };
    }

    try {
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
      }
      console.log(error.message);
      return {
        error: 'Unexpect error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
