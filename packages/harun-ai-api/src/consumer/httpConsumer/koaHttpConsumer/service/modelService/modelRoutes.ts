import Router from '@koa/router';
import {
  createCompletionUseCase,
  createModelUseCase,
  deletModelUseCase,
  getModelUseCase,
  listModelsUseCase,
  updateModelUseCase,
} from '../..';
import UpdateModelService from './updateModelService';
import GetModelService from './getModelService';
import ListModelsService from './listModelsService';
import CreateModelService from './createModelService';
import DeleteModelService from './deleteModelService';
import CreateCompletionService from './createCompletionService';

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

modelRouter.post('/model', async ctx => {
  const response = await new CreateModelService(createModelUseCase).execute(
    ctx
  );
  ctx.status = response.statusCode;
  ctx.body = response;
});

modelRouter.put('/model/:modelId', async ctx => {
  const response = await new UpdateModelService(updateModelUseCase).execute(
    ctx
  );
  ctx.status = response.statusCode;
  ctx.body = response;
});

modelRouter.delete('/model/:modelId', async ctx => {
  const response = await new DeleteModelService(deletModelUseCase).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

modelRouter.post('/model/completion/:modelId', async ctx => {
  const response = await new CreateCompletionService(
    createCompletionUseCase
  ).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

export default modelRouter;
