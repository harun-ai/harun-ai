import { ParameterizedContext } from 'koa';
import z from 'zod';

import InvalidInputSchemaError from 'packages/harun-ai-api/src/core/errors/InvalidInputSchemaError';
import ModelAlreadyExistsError from 'packages/harun-ai-api/src/core/errors/ModelAlreadyExistsError';
import CreateModelUseCase from 'packages/harun-ai-api/src/core/useCase/model/createModelUseCase';
import Model from '../../../../../core/entities/Model';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class CreateModelService implements IService<Model> {
  constructor(private createModelUseCase: CreateModelUseCase) {}
  async execute(
    ctx: ParameterizedContext
  ): Promise<ServiceDTO<Model>['Response']> {
    try {
      const params = await z
        .object({
          name: z.string({ required_error: "'name' is required" }),
          model: z.string({ required_error: "'model' is required" }),
          description: z.string({
            required_error: "'description' is required",
          }),
          inputSchema: z.record(z.unknown(), {
            required_error: "'inputSchema' is required",
          }),
          prompt: z.string({ required_error: "'name' is required" }),
          temperature: z.number().optional(),
          maxTokens: z.number().optional(),
          topP: z.number().optional(),
          frequencyPenalty: z.number().optional(),
          presencePenalty: z.number().optional(),
        })
        .parseAsync(ctx.request.body);

      return {
        success: await this.createModelUseCase.use(params),
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
