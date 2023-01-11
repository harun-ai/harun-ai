import { ParameterizedContext } from 'koa';
import z from 'zod';

import Model from '../../../../../core/entities/Model';
import InvalidInputSchemaError from '../../../../../core/errors/InvalidInputSchemaError';
import ModelAlreadyExistsError from '../../../../../core/errors/ModelAlreadyExistsError';
import IService, { ServiceDTO, StatusCode } from '../IService';
import CreateModelUseCase from '../../../../../core/useCase/model/createModelUseCase';

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
          prompt: z.string({ required_error: "'prompt' is required" }),
          temperature: z.number().nullable(),
          maxTokens: z.number().nullable(),
          topP: z.number().nullable(),
          frequencyPenalty: z.number().nullable(),
          presencePenalty: z.number().nullable(),
        })
        .parseAsync(ctx.request.body);

      return {
        success: await this.createModelUseCase.use({
          userId: ctx.state.user.id,
          ...params,
        }),
        statusCode: StatusCode.CREATED,
      };
    } catch (error) {
      if (error instanceof ModelAlreadyExistsError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.BAD_REQUEST,
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
