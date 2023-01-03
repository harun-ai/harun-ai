import GetModelUseCase from '../../../core/useCase/model/getModelUseCase';
import ListModelsUseCase from '../../../core/useCase/model/listModelsUseCase';
import UuidProvider from '../../../provider/idProvider/UuidProvider';
import StaticModelRepository from '../../../repository/modelRepository/staticModelRepository';

const idProvider = new UuidProvider();
const modelRepository = new StaticModelRepository(idProvider);

export const listModelsUseCase = new ListModelsUseCase(modelRepository);
export const getModelUseCase = new GetModelUseCase(modelRepository);
