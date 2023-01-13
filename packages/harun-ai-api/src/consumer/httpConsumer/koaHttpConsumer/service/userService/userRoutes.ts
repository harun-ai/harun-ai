import Router from '@koa/router';
import {
  createUserUseCase,
  deleteUserUseCase,
  getAllUsersUseCase,
  loginUserUseCase,
  twoWayEncryptorProvider,
  verifyEmailUseCase,
} from '../..';
import { authenticateUserMiddleware } from '../../middleware/authenticateUserMiddleware/authenticateUserMiddleware';
import CreateUserService from './createUserService';
import DeleteUserService from './deleteUserService';
import GetAllUsersService from './getAllUsersService';
import LoginUserService from './loginUserService';
import VerifyEmailService from './verifyEmailService';

const userRouter = new Router();

userRouter.post('/login', async ctx => {
  const response = await new LoginUserService(
    loginUserUseCase,
    twoWayEncryptorProvider
  ).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

userRouter.get('/user/verify-email', async ctx => {
  const response = await new VerifyEmailService(verifyEmailUseCase).execute(
    ctx
  );
  ctx.status = response.statusCode;
  ctx.body = response;
});

userRouter.delete('/user/:userId', authenticateUserMiddleware, async ctx => {
  const response = await new DeleteUserService(deleteUserUseCase).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

userRouter.post('/user', async ctx => {
  const response = await new CreateUserService(createUserUseCase).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

userRouter.get('/user', authenticateUserMiddleware, async ctx => {
  const response = await new GetAllUsersService(getAllUsersUseCase).execute();
  ctx.status = response.statusCode;
  ctx.body = response;
});

export default userRouter;
