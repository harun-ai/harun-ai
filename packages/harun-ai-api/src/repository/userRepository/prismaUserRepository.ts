import { PrismaClient, Prisma } from '@prisma/client';
import User from '../../core/entities/User';
import UserAlreadyExistsError from '../../core/errors/UserAlreadyExistsError';
import UserNotFoundError from '../../core/errors/UserNotFoundError';
import IUserRepository from './IUserRepository';

export default class PrismaUserRepository implements IUserRepository {
  constructor(private client: PrismaClient) {}

  async save(user: Omit<User, 'models' | 'predictions'>): Promise<User> {
    try {
      return await this.client.user.create({
        data: user,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        throw new UserAlreadyExistsError(error.message);

      throw error;
    }
  }

  async update(
    params: Partial<Omit<User, 'models' | 'predictions'>>
  ): Promise<User> {
    try {
      return await this.client.user.update({
        where: { id: params.id },
        data: params,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UserAlreadyExistsError(error.message);
      }

      throw error;
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      await this.client.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        throw new UserNotFoundError(error.message);

      throw error;
    }
  }

  async get(userId: string): Promise<User> {
    try {
      return await this.client.user.findFirstOrThrow({
        where: { id: userId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        throw new UserNotFoundError(error.message);

      throw error;
    }
  }

  async getWithEmail(userEmail: string): Promise<User> {
    try {
      return await this.client.user.findFirstOrThrow({
        where: { email: userEmail },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UserNotFoundError(error.message);
      }

      throw new UserNotFoundError();
    }
  }

  async getAll(): Promise<Partial<User>[]> {
    return this.client.user.findMany({
      include: {
        predictions: {
          select: {
            id: true,
            model: {
              select: {
                name: true,
              },
            },
            inputs: true,
          },
        },
        models: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
