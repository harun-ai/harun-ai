import CreateCompletionUseCase from 'packages/harun-ai-api/src/core/useCase/model/createCompletionUseCase';
import CreateModelUseCase from 'packages/harun-ai-api/src/core/useCase/model/createModelUseCase';
import DeleteModelUseCase from 'packages/harun-ai-api/src/core/useCase/model/deleteModelUseCase';
import UpdateModelUseCase from 'packages/harun-ai-api/src/core/useCase/model/updateModelUseCase';
import OpenAIModelPredictionProvider from 'packages/harun-ai-api/src/provider/modelPredictionProvider/OpenAIModelPredictionProvider';
import JsonSchemaProvider from 'packages/harun-ai-api/src/provider/schemaProvider/JsonSchemaProvider';
import MustacheTemplateStringProvider from 'packages/harun-ai-api/src/provider/templateStringProvider/MustacheTemplateStringProvider';
import GetModelUseCase from '../../../core/useCase/model/getModelUseCase';
import ListModelsUseCase from '../../../core/useCase/model/listModelsUseCase';
import UuidProvider from '../../../provider/idProvider/UuidProvider';
import StaticModelRepository from '../../../repository/modelRepository/staticModelRepository';

const idProvider = new UuidProvider();
const schemaProvider = new JsonSchemaProvider();
const templateStringProvider = new MustacheTemplateStringProvider();
const modelPredictionProvider = new OpenAIModelPredictionProvider(
  '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'
);

const modelRepository = new StaticModelRepository(idProvider, schemaProvider);

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
