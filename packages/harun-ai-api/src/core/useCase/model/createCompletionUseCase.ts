import { User } from '@prisma/client';
import IdProvider from '../../../provider/idProvider/IdProvider';
import IModelPredictionProvider from '../../../provider/modelPredictionProvider/IModelPredictionProvider';
import ISchemaProvider from '../../../provider/schemaProvider/ISchemaProvider';
import ITemplateStringProvider from '../../../provider/templateStringProvider/ITemplateStringProvider';
import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import IPredictionRepository from '../../../repository/predictionRepository/IPredictionRepository';
import Model from '../../entities/Model';
import Prediction from '../../entities/Prediction';
import IUseCase from '../IUseCase';

export type CreateCompletionUseCaseDTO = {
  Request: {
    modelId: Model['id'];
    inputs: Record<string, unknown>;
    userId: User['id'];
  };
  Response: Prediction;
};

export default class CreateCompletionUseCase
  implements IUseCase<CreateCompletionUseCaseDTO>
{
  constructor(
    private modelRepository: IModelRepository,
    private modelPredictionProvider: IModelPredictionProvider,
    private templateStringProvider: ITemplateStringProvider,
    private shemaProvider: ISchemaProvider,
    private idProvider: IdProvider,
    private predictionRepository: IPredictionRepository
  ) {}
  async use({
    modelId,
    userId,
    inputs,
  }: CreateCompletionUseCaseDTO['Request']): Promise<Prediction> {
    const model = await this.modelRepository.get(modelId);

    await this.shemaProvider.validate(inputs, model.inputSchema);

    const prompt = await this.templateStringProvider.render(
      model.prompt,
      inputs
    );

    const result = await this.modelPredictionProvider.createCompletion({
      model: model.model,
      prompt: prompt,
      temperature: model.temperature,
      maxTokens: model.maxTokens,
      topP: model.topP,
      frequencyPenalty: model.frequencyPenalty,
      presencyPenalty: model.presencePenalty,
    });

    const prediction = await this.predictionRepository.save(
      new Prediction({
        id: await this.idProvider.generateId(),
        modelId,
        userId,
        result,
        inputs,
        liked: null,
      })
    );

    return prediction;
  }
}
