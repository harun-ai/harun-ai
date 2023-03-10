import { Configuration, OpenAIApi } from 'openai';
import CreateCompletionError from '../../core/errors/CreateCompletionError';
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
    prompt: string | null;
    temperature: number | null;
    maxTokens: number | null;
    topP: number | null;
    frequencyPenalty: number | null;
    presencyPenalty: number | null;
  }): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model,
        prompt,
        temperature,
        max_tokens,
        top_p,
        frequency_penalty,
        presence_penalty,
        n: 1,
      });

      return response.data.choices[0]?.text || '';
    } catch (error) {
      if (error instanceof Error) {
        throw new CreateCompletionError('OpenAI is unavailable');
      }

      throw error;
    }
  }
}
