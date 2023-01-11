import { ParameterizedContext } from 'koa';
import { twoWayEncryptorProvider } from '../..';
import User from '../../../../../core/entities/User';
import ExpiredTokenError from '../../../../../core/errors/ExpiredTokenError';
import { StatusCode } from '../../service/IService';

export const authenticateUserMiddleware = async (
  ctx: ParameterizedContext,
  next: () => Promise<unknown>
): Promise<void> => {
  const authorization = ctx.request.headers.authorization;

  if (!authorization) {
    ctx.status = StatusCode.UNAUTHORIZED;
    return;
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    ctx.status = StatusCode.UNAUTHORIZED;
    return;
  }

  let user: Omit<User, 'password'>;

  try {
    user = await twoWayEncryptorProvider.decrypt(token);
  } catch (error) {
    if (error instanceof ExpiredTokenError) {
      ctx.status = StatusCode.UNAUTHORIZED;
      ctx.body = {
        error: error.message,
      };
      return;
    }

    console.log(error);

    ctx.body = { error: 'Unexpected error' };
    ctx.status = StatusCode.INTERNAL_SERVER_ERROR;
    return;
  }

  ctx.state.user = user;

  await next();
};
