import Model from '../../../../../core/entities/Model';
import ListModelsUseCase from '../../../../../core/useCase/model/listModelsUseCase';
import IService, { ServiceDTO, StatusCode } from '../IService';

export default class ListModelsService<IdType>
  implements IService<Model<IdType>[]>
{
  constructor(private listModelsUseCase: ListModelsUseCase<IdType>) {}
  async execute(): Promise<ServiceDTO<Model<IdType>[]>['Response']> {
    try {
      return {
        success: await this.listModelsUseCase.use(),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      return {
        error: 'Unexpect error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
