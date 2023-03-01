import { ParameterizedContext } from 'koa';
import { z } from 'zod';
import InvalidUserCredentialsError from '../../../../../core/errors/InvalidUserCreadentialsError';
import PredictionNotFoundError from '../../../../../core/errors/PredictionNotFoundError';
import UserNotFoundError from '../../../../../core/errors/UserNotFoundError';
import EvaluatePredictionUseCase from '../../../../../core/useCase/prediction/evaluatePredictionUseCase';
import { State } from '../../app';
import IService, { StatusCode } from '../IService';

export default class EvaluatePredictionService implements IService<void> {
  constructor(private evaluatePredictionUseCase: EvaluatePredictionUseCase) {}

  async execute(ctx: ParameterizedContext<State>): Promise<{
    success?: void | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      const params = await z
        .object({
          predictionId: z
            .string({ required_error: "'predictionId' is required" })
            .uuid('Invalid uuid'),
          liked: z.boolean({ required_error: "'liked' is required" }),
        })
        .parseAsync(ctx.request.body);

      const userId = ctx.state.user?.id;

      if (!userId) throw new UserNotFoundError();

      return {
        success: await this.evaluatePredictionUseCase.use({
          ...params,
          userId,
        }),
        statusCode: StatusCode.NO_CONTENT,
      };
    } catch (error) {
      if (error instanceof PredictionNotFoundError) {
        return {
          error: { code: error.name, message: error.message },
          statusCode: StatusCode.NOT_FOUND,
        };
      } else if (error instanceof InvalidUserCredentialsError) {
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
