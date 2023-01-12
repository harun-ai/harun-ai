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

  const user: Omit<User, 'password'> = await twoWayEncryptorProvider.decrypt(
    token
  );

  if (!user.id) {
    const error = new ExpiredTokenError('Token expired');

    ctx.status = StatusCode.UNAUTHORIZED;
    ctx.body = {
      error: { code: error.name, message: error.message },
    };
    return;
  }

  ctx.state.user = user;

  await next();
};
