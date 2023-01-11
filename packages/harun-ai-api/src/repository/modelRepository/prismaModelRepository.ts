import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import Model from '../../core/entities/Model';
import ModelAlreadyExistsError from '../../core/errors/ModelAlreadyExistsError';
import ModelNotFoundError from '../../core/errors/ModelNotFoundError';
import IModelRepository from './IModelRepository';

export default class PrismaModelRepository implements IModelRepository {
  constructor(private client: PrismaClient) {}

  async getAll(): Promise<Partial<Model>[]> {
    return this.client.model.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        description: true,
        user: { select: { name: true, id: true } },
      },
    });
  }
  async get(modelId: string): Promise<Model> {
    try {
      return this.client.model.findFirstOrThrow({
        where: {
          id: modelId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new ModelNotFoundError(error.message);

      throw error;
    }
  }
  async update(model: Model): Promise<Model> {
    try {
      return this.client.model.update({
        where: {
          id: model.id,
        },
        data: model,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new ModelNotFoundError(error.message);

      throw error;
    }
  }
  async delete(modelId: string): Promise<void> {
    try {
      await this.client.model.delete({
        where: {
          id: modelId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new ModelNotFoundError(error.message);

      throw error;
    }
  }

  async save(model: Model): Promise<Model> {
    try {
      return this.client.model.create({
        data: model,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new ModelAlreadyExistsError(error.message);

      throw error;
    }
  }
}
