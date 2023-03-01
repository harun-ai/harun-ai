import { ParameterizedContext } from 'koa';
import z from 'zod';

import Model from '../../../../../core/entities/Model';
import InvalidInputSchemaError from '../../../../../core/errors/InvalidInputSchemaError';
import ModelNotFoundError from '../../../../../core/errors/ModelNotFoundError';
import UpdateModelUseCase from '../../../../../core/useCase/model/updateModelUseCase';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class UpdateModelService implements IService<Model> {
  constructor(private updateModelUseCase: UpdateModelUseCase) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<Model>['Response']> {
    try {
      const params = await z
        .object({
          model: z.string().optional(),
          description: z.string().optional(),
          inputSchema: z.record(z.unknown()).optional(),
          prompt: z.string().optional(),
          temperature: z.number().optional(),
          maxTokens: z.number().optional(),
          topP: z.number().optional(),
          frequencyPenalty: z.number().optional(),
          presencePenalty: z.number().optional(),
          active: z.boolean().optional(),
        })
        .parseAsync(ctx.request.body);

      const { modelId } = await z
        .object({
          modelId: z
            .string({ required_error: "'modelId' is required" })
            .uuid("Invalid 'modelId'"),
        })
        .parseAsync(ctx.params);

      return {
        success: await this.updateModelUseCase.use({ params, modelId }),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      if (error instanceof ModelNotFoundError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.NOT_FOUND,
        };
      } else if (error instanceof InvalidInputSchemaError) {
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
