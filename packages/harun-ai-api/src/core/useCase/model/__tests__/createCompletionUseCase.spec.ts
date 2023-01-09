import IModelPredictionProvider from '../../../../provider/modelPredictionProvider/IModelPredictionProvider';
import ISchemaProvider from '../../../../provider/schemaProvider/ISchemaProvider';
import ITemplateStringProvider from '../../../../provider/templateStringProvider/ITemplateStringProvider';
import IModelRepository from '../../../../repository/modelRepository/IModelRepository';
import Model from '../../../entities/Model';
import InvalidInputParamsError from '../../../errors/InvalidInputParamsError';
import ModelNotFoundError from '../../../errors/ModelNotFoundError';
import CreateCompletionUseCase from '../createCompletionUseCase';

describe('createCompletionUseCase', () => {
  const mockGet = jest.fn();
  const mockValidate = jest.fn();
  const mockRender = jest.fn();
  const mockCreateCompletion = jest.fn();

  beforeEach(() => {
    mockGet.mockClear();
    mockValidate.mockClear();
    mockRender.mockClear();
    mockCreateCompletion.mockClear();
  });

  const mockModelRepository: Partial<IModelRepository> = {
    get: mockGet,
  };

  const mockSchemaProvider: Partial<ISchemaProvider> = {
    validate: mockValidate,
  };

  const mockTemplateStringProvider: Partial<ITemplateStringProvider> = {
    render: mockRender,
  };

  const mockModelPredictionProvider: Partial<IModelPredictionProvider> = {
    createCompletion: mockCreateCompletion,
  };

  beforeEach(() => {
    mockGet.mockClear();
    mockValidate.mockClear();
    mockRender.mockClear();
    mockCreateCompletion.mockClear();
  });

  it('return completions', async () => {
    const modelId = 'testId';
    const rederizedString = 'test rederized string';
    const AICompletions = ['AI created text'];
    const model = new Model({
      id: modelId,
      name: 'testName',
      model: 'testModel',
      description: 'testDescription',
      prompt: 'testPrompt',
      inputSchema: {
        testInput: 'testInput',
      },
    });

    const request = {
      modelId,
      inputs: {
        testInput: 'testInput',
      },
    };

    mockGet.mockImplementation(() => model);
    mockValidate.mockImplementation(() => void 0);
    mockRender.mockImplementation(() => rederizedString);
    mockCreateCompletion.mockImplementation(() => AICompletions);

    const createModelCompletionUseCase = new CreateCompletionUseCase(
      mockModelRepository as IModelRepository,
      mockModelPredictionProvider as IModelPredictionProvider,
      mockTemplateStringProvider as ITemplateStringProvider,
      mockSchemaProvider as ISchemaProvider
    );

    await expect(createModelCompletionUseCase.use(request)).resolves.toEqual(
      AICompletions
    );
    expect(mockGet).toBeCalledWith(modelId);
    expect(mockValidate).toBeCalledWith(request.inputs, model.inputSchema);
    expect(mockRender).toBeCalledWith(model.prompt, request.inputs);
    expect(mockCreateCompletion).toBeCalledWith({
      model: model.model,
      prompt: rederizedString,
      temperature: model.temperature,
      maxTokens: model.maxTokens,
      topP: model.topP,
      frequencyPenalty: model.frequencyPenalty,
      presencyPenalty: model.presencePenalty,
    });
  });

  it('throw model not found', async () => {
    const modelId = 'testId';
    const rederizedString = 'test rederized string';
    const AICompletions = ['AI created text'];

    const request = {
      modelId,
      inputs: {
        testInput: 'testInput',
      },
    };

    mockGet.mockImplementation(() => {
      throw new ModelNotFoundError();
    });
    mockValidate.mockImplementation(() => void 0);
    mockRender.mockImplementation(() => rederizedString);
    mockCreateCompletion.mockImplementation(() => AICompletions);

    const createModelCompletionUseCase = new CreateCompletionUseCase(
      mockModelRepository as IModelRepository,
      mockModelPredictionProvider as IModelPredictionProvider,
      mockTemplateStringProvider as ITemplateStringProvider,
      mockSchemaProvider as ISchemaProvider
    );

    await expect(
      createModelCompletionUseCase.use(request)
    ).rejects.toThrowError(ModelNotFoundError);
    expect(mockGet).toBeCalledWith(modelId);
    expect(mockValidate).not.toBeCalled();
    expect(mockRender).not.toBeCalled();
    expect(mockCreateCompletion).not.toBeCalled();
  });

  it('throw invalid input params', async () => {
    const modelId = 'testId';
    const rederizedString = 'test rederized string';
    const AICompletions = ['AI created text'];
    const model = new Model({
      id: modelId,
      name: 'testName',
      model: 'testModel',
      description: 'testDescription',
      prompt: 'testPrompt',
      inputSchema: {
        testInput: 'testInput',
      },
    });

    const request = {
      modelId,
      inputs: {
        testInput: 'testInput',
      },
    };

    mockGet.mockImplementation(() => model);
    mockValidate.mockImplementation(() => {
      throw new InvalidInputParamsError();
    });
    mockRender.mockImplementation(() => rederizedString);
    mockCreateCompletion.mockImplementation(() => AICompletions);

    const createModelCompletionUseCase = new CreateCompletionUseCase(
      mockModelRepository as IModelRepository,
      mockModelPredictionProvider as IModelPredictionProvider,
      mockTemplateStringProvider as ITemplateStringProvider,
      mockSchemaProvider as ISchemaProvider
    );

    await expect(
      createModelCompletionUseCase.use(request)
    ).rejects.toThrowError(InvalidInputParamsError);
    expect(mockGet).toBeCalledWith(modelId);
    expect(mockValidate).toBeCalledWith(request.inputs, model.inputSchema);
    expect(mockRender).not.toBeCalled();
    expect(mockCreateCompletion).not.toBeCalled();
  });
});
