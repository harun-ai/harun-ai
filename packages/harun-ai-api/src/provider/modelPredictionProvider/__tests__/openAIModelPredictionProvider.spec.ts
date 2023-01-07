import { OPENAI_API_KEY } from '../../../envConfig';
import OpenAIModelPredictionProvider from '../OpenAIModelPredictionProvider';

const mockCreateCompletion = jest.fn(async () => ({ data: { choices: [] } }));

jest.mock('openai', () => ({
  Configuration: jest.fn().mockImplementation(() => jest.fn(() => ({}))),
  OpenAIApi: jest.fn().mockImplementation(() => ({
    createCompletion: mockCreateCompletion,
  })),
}));

describe('openAIModelPredictionProvider', () => {
  it('call to openAIApi', async () => {
    const apiKey = OPENAI_API_KEY;
    const model = 'test';

    const openAIModelPredictionProvider = new OpenAIModelPredictionProvider(
      apiKey
    );

    await openAIModelPredictionProvider.createCompletion({ model });

    expect(mockCreateCompletion).toBeCalledWith({
      model,
      frequency_penalty: undefined,
      max_tokens: undefined,
      n: 3,
      presence_penalty: undefined,
      prompt: undefined,
      temperature: undefined,
      top_p: undefined,
    });
  });
});
