import { Prisma, PrismaClient } from '@prisma/client';
import Prediction from '../../core/entities/Prediction';
import PredictionNotFoundError from '../../core/errors/PredictionNotFoundError';
import IPredictionRepository from './IPredictionRepository';

export default class PrismaPredictionRepository
  implements IPredictionRepository
{
  constructor(private client: PrismaClient) {}

  async get(predictionId: string): Promise<Prediction> {
    try {
      return await this.client.prediction.findFirstOrThrow({
        where: { id: predictionId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        throw new PredictionNotFoundError(error.message);

      throw error;
    }
  }

  async evaluate(predictionId: string, liked: boolean): Promise<Prediction> {
    try {
      return await this.client.prediction.update({
        where: { id: predictionId },
        data: {
          liked,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        throw new PredictionNotFoundError(error.message);

      throw error;
    }
  }

  async save(prediction: Prediction): Promise<Prediction> {
    return await this.client.prediction.create({
      data: {
        id: prediction.id,
        modelId: prediction.modelId,
        userId: prediction.userId,
        result: prediction.result,
        inputs: prediction.inputs,
      },
    });
  }

  async getAll(): Promise<Partial<Prediction>[]> {
    return await this.client.prediction.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        model: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
  }
}
