import Router from '@koa/router';
import { parse } from 'json2csv';
import dot from 'dot-object';

import { listPredictionsUseCase } from '../..';
import ListPredictionsService from './listPredictionsService';
import { authenticateUserMiddlewareByQuery } from '../../middleware/authenticateUserMiddleware/authenticateUserMiddlewareByQuery';

const predictionRouter = new Router();

predictionRouter.use(authenticateUserMiddlewareByQuery);

predictionRouter.get('/prediction', async ctx => {
  const response = await new ListPredictionsService(
    listPredictionsUseCase
  ).execute();

  const csv = parse(response.success?.map(item => dot.dot(item)) || []);

  ctx.set('Content-disposition', `attachment; filename=predictions.csv`);
  ctx.status = response.statusCode;
  ctx.body = csv;
});

export default predictionRouter;
