import Model from '../../../../../core/entities/Model';
import ListModelsUseCase from '../../../../../core/useCase/model/listModelsUseCase';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class ListModelsService implements IService<Partial<Model>[]> {
  constructor(private listModelsUseCase: ListModelsUseCase) {}
  async execute(): Promise<ServiceDTO<Partial<Model>[]>['Response']> {
    try {
      return {
        success: await this.listModelsUseCase.use(),
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
