import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import User from '../../../core/entities/User';

import modelRouter from './service/modelService/modelRoutes';
import userRouter from './service/userService/userRoutes';

export type State = {
  user?: Omit<User, 'password'>;
};

const app = new Koa<State>({ proxy: false });

app.use(KoaLogger());
app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(modelRouter.routes()).use(modelRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

export default app;
