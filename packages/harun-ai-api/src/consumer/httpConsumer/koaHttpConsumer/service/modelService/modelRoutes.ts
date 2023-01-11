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
import { authenticateUserMiddleware } from '../../middleware/authenticateUserMiddleware/authenticateUserMiddleware';

const modelRouter = new Router();

modelRouter.use(authenticateUserMiddleware);

modelRouter.get('/model', async ctx => {
  const response = await new ListModelsService(listModelsUseCase).execute();
  console.log(ctx.state.user);
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
