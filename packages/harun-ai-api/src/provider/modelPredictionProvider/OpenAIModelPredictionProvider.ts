import { Configuration, OpenAIApi } from 'openai';
import IModelPredictionProvider from './IModelPredictionProvider';

export default class OpenAIModelPredictionProvider
  implements IModelPredictionProvider
{
  openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  async createCompletion({
    model,
    prompt,
    temperature,
    maxTokens,
    topP,
    frequencyPenalty,
    presencyPenalty,
  }: {
    model: string;
    prompt?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencyPenalty?: number;
  }): Promise<any> {
    const response = await this.openai.createCompletion({
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      n: 5,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencyPenalty,
    });

    return response.data.choices;
  }
}
