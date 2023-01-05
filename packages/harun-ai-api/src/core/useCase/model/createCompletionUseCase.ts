import IModelPredictionProvider from 'packages/harun-ai-api/src/provider/modelPredictionProvider/IModelPredictionProvider';
import ISchemaProvider from 'packages/harun-ai-api/src/provider/schemaProvider/ISchemaProvider';
import ITemplateStringProvider from 'packages/harun-ai-api/src/provider/templateStringProvider/ITemplateStringProvider';
import IModelRepository from '../../../repository/modelRepository/IModelRepository';
import Model from '../../entities/Model';
import IUseCase from '../IUseCase';

export type CreateCompletionUseCaseDTO<IdType> = {
  Request: {
    modelId: IdType;
    inputs: Record<string, unknown>;
  };
  Response: unknown;
};

export default class CreateCompletionUseCase<IdType>
  implements IUseCase<CreateCompletionUseCaseDTO<IdType>>
{
  constructor(
    private modelRepository: IModelRepository<IdType>,
    private modelPredictionProvider: IModelPredictionProvider,
    private templateStringProvider: ITemplateStringProvider,
    private shemaProvider: ISchemaProvider
  ) {}
  async use({
    modelId,
    inputs,
  }: CreateCompletionUseCaseDTO<IdType>['Request']): Promise<Model<IdType>> {
    const model = await this.modelRepository.get(modelId);

    await this.shemaProvider.validate(inputs, model.inputSchema);

    const prompt = await this.templateStringProvider.render(
      model.prompt,
      inputs
    );

    return this.modelPredictionProvider.createCompletion({
      model: model.model,
      prompt: prompt,
      temperature: model.temperature,
      maxTokens: model.maxTokens,
      topP: model.topP,
      frequencyPenalty: model.frequencyPenalty,
      presencyPenalty: model.presencePenalty,
    });
  }
}
