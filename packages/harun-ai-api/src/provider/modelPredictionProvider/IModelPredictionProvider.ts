export type GetPredictionDTO = {
  Request: {
    model: string;
    prompt?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencyPenalty?: number;
  };
  Response: any;
};

export default interface IModelPredictionProvider {
  createCompletion(
    params: GetPredictionDTO['Request']
  ): Promise<GetPredictionDTO['Response']>;
}
