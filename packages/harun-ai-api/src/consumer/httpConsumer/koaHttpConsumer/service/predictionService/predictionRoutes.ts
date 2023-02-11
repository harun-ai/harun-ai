import Router from '@koa/router';
import { parse } from 'json2csv';
import dot from 'dot-object';

import { evaluatePredictionUseCase, listPredictionsUseCase } from '../..';
import ListPredictionsService from './listPredictionsService';
import { authenticateUserMiddlewareByQuery } from '../../middleware/authenticateUserMiddleware/authenticateUserMiddlewareByQuery';
import EvaluatePredictionService from './evaluatePredictionService';
import { authenticateUserMiddleware } from '../../middleware/authenticateUserMiddleware/authenticateUserMiddleware';

const predictionRouter = new Router();

predictionRouter.get(
  '/prediction',
  authenticateUserMiddlewareByQuery,
  async ctx => {
    const response = await new ListPredictionsService(
      listPredictionsUseCase
    ).execute();

    console.log(response);

    const csv = parse(
      response.success?.map(({ inputs, ...item }) => {
        return {
          ...dot.dot(item),
          inputs,
        };
      }) || []
    );

    ctx.set('Content-disposition', `attachment; filename=predictions.csv`);
    ctx.status = response.statusCode;
    ctx.body = csv;
  }
);

predictionRouter.post(
  '/prediction/evaluate',
  authenticateUserMiddleware,
  async ctx => {
    const response = await new EvaluatePredictionService(
      evaluatePredictionUseCase
    ).execute(ctx);

    ctx.status = response.statusCode;
    ctx.body = response;
  }
);

export default predictionRouter;
