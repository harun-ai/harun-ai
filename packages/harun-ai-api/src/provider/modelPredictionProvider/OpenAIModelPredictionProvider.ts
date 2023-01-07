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
    maxTokens: max_tokens,
    topP: top_p,
    frequencyPenalty: frequency_penalty,
    presencyPenalty: presence_penalty,
  }: {
    model: string;
    prompt?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencyPenalty?: number;
  }): Promise<unknown> {
    const response = await this.openai.createCompletion({
      model,
      prompt,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
      n: 3,
    });

    return response.data.choices;
  }
}
