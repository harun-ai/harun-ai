import { ParameterizedContext } from 'koa';
import { twoWayEncryptorProvider } from '../..';
import User from '../../../../../core/entities/User';
import InvalidTokenError from '../../../../../core/errors/InvalidTokenError';
import { StatusCode } from '../../service/IService';

export const authenticateUserMiddlewareByQuery = async (
  ctx: ParameterizedContext,
  next: () => Promise<unknown>
): Promise<void> => {
  const token = ctx.query.token?.toString();

  if (!token) {
    ctx.status = StatusCode.UNAUTHORIZED;
    return;
  }

  const user: Omit<User, 'password'> = await twoWayEncryptorProvider.decrypt(
    token
  );

  if (!user.id) {
    const error = new InvalidTokenError('Token is invalid or expired');

    ctx.status = StatusCode.UNAUTHORIZED;
    ctx.body = {
      error: { code: error.name, message: error.message },
    };
    return;
  }

  ctx.state.user = user;

  await next();
};
