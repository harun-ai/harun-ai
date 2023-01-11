export type GetPredictionDTO = {
  Request: {
    model: string;
    prompt: string | null;
    temperature: number | null;
    maxTokens: number | null;
    topP: number | null;
    frequencyPenalty: number | null;
    presencyPenalty: number | null;
  };
  Response: unknown;
};

export default interface IModelPredictionProvider {
  createCompletion(
    params: GetPredictionDTO['Request']
  ): Promise<GetPredictionDTO['Response']>;
}
