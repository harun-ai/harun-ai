import CreateCompletionUseCase from '../../../core/useCase/model/createCompletionUseCase';
import CreateModelUseCase from '../../../core/useCase/model/createModelUseCase';
import DeleteModelUseCase from '../../../core/useCase/model/deleteModelUseCase';
import GetModelUseCase from '../../../core/useCase/model/getModelUseCase';
import ListModelsUseCase from '../../../core/useCase/model/listModelsUseCase';
import UpdateModelUseCase from '../../../core/useCase/model/updateModelUseCase';
import { OPENAI_API_KEY } from '../../../envConfig';
import OpenAIModelPredictionProvider from '../../../provider/modelPredictionProvider/OpenAIModelPredictionProvider';
import JsonSchemaProvider from '../../../provider/schemaProvider/JsonSchemaProvider';
import MustacheTemplateStringProvider from '../../../provider/templateStringProvider/MustacheTemplateStringProvider';
import StaticModelRepository from '../../../repository/modelRepository/staticModelRepository';

const schemaProvider = new JsonSchemaProvider();
const templateStringProvider = new MustacheTemplateStringProvider();
const modelPredictionProvider = new OpenAIModelPredictionProvider(
  OPENAI_API_KEY
);

const modelRepository = new StaticModelRepository(schemaProvider);

export const listModelsUseCase = new ListModelsUseCase(modelRepository);
export const getModelUseCase = new GetModelUseCase(modelRepository);
export const updateModelUseCase = new UpdateModelUseCase(modelRepository);
export const createModelUseCase = new CreateModelUseCase(modelRepository);
export const deletModelUseCase = new DeleteModelUseCase(modelRepository);
export const createCompletionUseCase = new CreateCompletionUseCase(
  modelRepository,
  modelPredictionProvider,
  templateStringProvider,
  schemaProvider
);
