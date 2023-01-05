import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';

import modelRouter from './service/modelService/modelRoutes';

const app = new Koa({ proxy: false });

app.use(KoaLogger());
app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(modelRouter.routes()).use(modelRouter.allowedMethods());

export default app;
