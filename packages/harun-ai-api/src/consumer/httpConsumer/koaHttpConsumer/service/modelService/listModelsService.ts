import Model from '../../../../../core/entities/Model';
import ListModelsUseCase from '../../../../../core/useCase/model/listModelsUseCase';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class ListModelsService implements IService<Model[]> {
  constructor(private listModelsUseCase: ListModelsUseCase) {}
  async execute(): Promise<ServiceDTO<Model[]>['Response']> {
    try {
      return {
        success: await this.listModelsUseCase.use(),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'Unexpect error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
