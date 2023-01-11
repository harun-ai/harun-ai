import Router from '@koa/router';
import { loginUserUseCase, twoWayEncryptorProvider } from '../..';
import LoginUserService from './loginUserService';

const userRouter = new Router();

userRouter.post('/login', async ctx => {
  const response = await new LoginUserService(
    loginUserUseCase,
    twoWayEncryptorProvider
  ).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

export default userRouter;
