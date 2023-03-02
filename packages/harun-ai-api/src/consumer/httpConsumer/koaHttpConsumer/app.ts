import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import User from '../../../core/entities/User';
import { createReadStream } from 'fs';

import modelRouter from './service/modelService/modelRoutes';
import predictionRouter from './service/predictionService/predictionRoutes';
import userRouter from './service/userService/userRoutes';

export type State = {
  user?: Omit<User, 'password'>;
};

const app = new Koa<State>({ proxy: false });
const routes = new Router();

routes.get('readme', '/', ctx => {
  ctx.type = 'html';
  ctx.body = createReadStream('index.html');
});

app.use(KoaLogger());
app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(routes.routes()).use(routes.allowedMethods());
app.use(modelRouter.routes()).use(modelRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(predictionRouter.routes()).use(predictionRouter.allowedMethods());

export default app;
