import Prediction from '../../../../../core/entities/Prediction';
import ListPredictionsUseCase from '../../../../../core/useCase/prediction/listPredictionsUseCase';
import IService, { StatusCode } from '../IService';

export type ResponseType = Partial<Prediction>[];

export default class ListPredictionsService implements IService<ResponseType> {
  constructor(private listPredictionsUseCase: ListPredictionsUseCase) {}

  async execute(): Promise<{
    success?: ResponseType | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      return {
        success: await this.listPredictionsUseCase.use(),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      console.error(error);

      return {
        error: { code: 'INTERNAL_SERVER_ERROR', message: 'Unexpect error' },
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
