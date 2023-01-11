import { PrismaClient } from '@prisma/client';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import User from '../../core/entities/User';
import UserAlreadyExistsError from '../../core/errors/UserAlreadyExistsError';
import UserNotFoundError from '../../core/errors/UserNotFoundError';
import IUserRepository from './IUserRepository';

export default class PrismaUserRepository implements IUserRepository {
  constructor(private client: PrismaClient) {}

  async save(user: User): Promise<User> {
    try {
      return this.client.user.create({
        data: user,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new UserAlreadyExistsError(error.message);

      throw error;
    }
  }

  async update(params: Partial<User>): Promise<User> {
    try {
      return this.client.user.update({
        where: { id: params.id },
        data: params,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new UserNotFoundError(error.message);

      throw error;
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      await this.client.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new UserNotFoundError(error.message);

      throw error;
    }
  }

  async get(userId: string): Promise<User> {
    try {
      return this.client.user.findFirstOrThrow({
        where: { id: userId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new UserNotFoundError(error.message);

      throw error;
    }
  }

  async getWithEmail(userEmail: string): Promise<User> {
    try {
      return this.client.user.findFirstOrThrow({
        where: { email: userEmail },
      });
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new UserNotFoundError(error.message);

      throw error;
    }
  }

  async getAll(): Promise<Partial<User>[]> {
    return this.client.user.findMany();
  }
}
