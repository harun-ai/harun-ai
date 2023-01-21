import Router from '@koa/router';
import {
  createUserUseCase,
  deleteUserUseCase,
  forgotPasswordUseCase,
  getAllUsersUseCase,
  inviteFriendUseCase,
  loginUserUseCase,
  resetPasswordUseCase,
  twoWayEncryptorProvider,
  updateUserUseCase,
  verifyEmailUseCase,
} from '../..';
import { authenticateUserMiddleware } from '../../middleware/authenticateUserMiddleware/authenticateUserMiddleware';
import CreateUserService from './createUserService';
import DeleteUserService from './deleteUserService';
import ForgotPasswordService from './forgotPasswordService';
import GetAllUsersService from './getAllUsersService';
import InviteFriendService from './inviteFriendService';
import LoginUserService from './loginUserService';
import ResetPasswordService from './resetPasswordService';
import UpdateUserService from './updateUserService';
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

userRouter.post('/user/forgot-password', async ctx => {
  const response = await new ForgotPasswordService(
    forgotPasswordUseCase
  ).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

userRouter.post('/user/reset-password', async ctx => {
  const response = await new ResetPasswordService(resetPasswordUseCase).execute(
    ctx
  );
  ctx.status = response.statusCode;
  ctx.body = response;
});

userRouter.post(
  '/user/invite-friend',
  authenticateUserMiddleware,
  async ctx => {
    const response = await new InviteFriendService(inviteFriendUseCase).execute(
      ctx
    );
    ctx.status = response.statusCode;
    ctx.body = response;
  }
);

userRouter.delete('/user/:userId', authenticateUserMiddleware, async ctx => {
  const response = await new DeleteUserService(deleteUserUseCase).execute(ctx);
  ctx.status = response.statusCode;
  ctx.body = response;
});

userRouter.put('/user/:userId', authenticateUserMiddleware, async ctx => {
  const response = await new UpdateUserService(updateUserUseCase).execute(ctx);
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
