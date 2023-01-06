import { ParameterizedContext } from 'koa';
import z from 'zod';

import Model from '../../../../../core/entities/Model';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import GetModelUseCase from '../../../../../core/useCase/model/getModelUseCase';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class GetModelService implements IService<Model> {
  constructor(private getModelUseCase: GetModelUseCase) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<Model>['Response']> {
    try {
      const params = z
        .object({
          modelId: z
            .string({ required_error: 'Model id ias asdfjiasfasjf' })
            .uuid('Invalid uuid'),
        })
        .parse(ctx.params);

      return {
        success: await this.getModelUseCase.use(params),
        statusCode: StatusCode.OK,
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
