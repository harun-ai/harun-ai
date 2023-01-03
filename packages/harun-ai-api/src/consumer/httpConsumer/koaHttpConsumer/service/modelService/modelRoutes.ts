import Router from '@koa/router';
import { getModelUseCase, listModelsUseCase } from '../..';
import GetModelService from './getModelService';
import ListModelsService from './listModelsService';

const modelRouter = new Router();

modelRouter.get('/model', async ctx => {
  const response = await new ListModelsService(listModelsUseCase).execute();
  ctx.status = response.statusCode;
  ctx.body = response;
});

modelRouter.get('/model/:modelId', async ctx => {
  const response = await new GetModelService(getModelUseCase).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

export default modelRouter;
