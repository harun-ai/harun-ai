import { PrismaClient } from '@prisma/client';
import Prediction from '../../core/entities/Prediction';
import IPredictionRepository from './IPredictionRepository';

export default class PrismaPredictionRepository
  implements IPredictionRepository
{
  constructor(private client: PrismaClient) {}

  async save(prediction: Prediction): Promise<Prediction> {
    return await this.client.prediction.create({
      data: {
        id: prediction.id,
        modelId: prediction.modelId,
        userId: prediction.userId,
        result: prediction.result,
      },
    });
  }
  async getAll(): Promise<Partial<Prediction>[]> {
    return await this.client.prediction.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        model: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
  }
}