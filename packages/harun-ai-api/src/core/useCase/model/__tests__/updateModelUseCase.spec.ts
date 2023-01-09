import ISchemaProvider from '../../../../provider/schemaProvider/ISchemaProvider';
import IModelRepository from '../../../../repository/modelRepository/IModelRepository';
import Model from '../../../entities/Model';
import InvalidInputSchemaError from '../../../errors/InvalidInputSchemaError';
import ModelNotFoundError from '../../../errors/ModelNotFoundError';
import UpdateModelUseCase from '../updateModelUseCase';

describe('updateModelUseCase', () => {
  const mockGet = jest.fn();
  const mockUpdate = jest.fn();
  const mockValidateSchema = jest.fn();

  const mockModelRepository: Partial<IModelRepository> = {
    get: mockGet,
    update: mockUpdate,
  };

  const mockSchemaProvider: Partial<ISchemaProvider> = {
    validateSchema: mockValidateSchema,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  beforeEach(() => {
    mockGet.mockClear();
    mockUpdate.mockClear();
    mockValidateSchema.mockClear();
  });

  it('update model', async () => {
    const request = {
      params: {
        name: 'testName',
        model: 'testModel',
        description: 'testDescription',
        prompt: 'testPrompt',
        inputSchema: {
          testInput: 'testInput',
        },
      },
      modelId: 'testId',
    };

    const oldModel = new Model({
      id: 'testId',
      name: 'testName',
      model: 'oldModel',
      description: 'oldDescription',
      prompt: 'oldPrompt',
      inputSchema: {
        oldInput: 'oldInput',
      },
    });

    mockGet.mockImplementation(() => oldModel);
    mockUpdate.mockImplementation((model: Model) => model);
    mockValidateSchema.mockImplementation(() => void 0);

    const updateModelUseCase = new UpdateModelUseCase(
      mockModelRepository as IModelRepository,
      mockSchemaProvider as ISchemaProvider
    );

    await expect(updateModelUseCase.use(request)).resolves.toEqual({
      id: request.modelId,
      ...request.params,
      active: true,
      createdAt: mockDate,
      frequencyPenalty: undefined,
      maxTokens: undefined,
      presencePenalty: undefined,
      temperature: undefined,
      topP: undefined,
      updatedAt: mockDate,
      user: undefined,
    });
    expect(mockGet).toBeCalledWith(request.modelId);
    expect(mockValidateSchema).toBeCalledWith(request.params.inputSchema);
    expect(mockUpdate).toBeCalledWith({
      id: request.modelId,
      ...request.params,
      active: true,
      createdAt: mockDate,
      frequencyPenalty: undefined,
      maxTokens: undefined,
      presencePenalty: undefined,
      temperature: undefined,
      topP: undefined,
      updatedAt: mockDate,
      user: undefined,
    });
  });

  it('throw invalid input schema', async () => {
    const request = {
      params: {
        name: 'testName',
        model: 'testModel',
        description: 'testDescription',
        prompt: 'testPrompt',
        inputSchema: {
          testInput: 'testInput',
        },
      },
      modelId: 'testId',
    };

    const oldModel = new Model({
      id: 'testId',
      name: 'testName',
      model: 'oldModel',
      description: 'oldDescription',
      prompt: 'oldPrompt',
      inputSchema: {
        oldInput: 'oldInput',
      },
    });

    mockGet.mockImplementation(() => oldModel);
    mockUpdate.mockImplementation((model: Model) => model);
    mockValidateSchema.mockImplementation(() => {
      throw new Error();
    });

    const updateModelUseCase = new UpdateModelUseCase(
      mockModelRepository as IModelRepository,
      mockSchemaProvider as ISchemaProvider
    );

    await expect(updateModelUseCase.use(request)).rejects.toThrowError(
      InvalidInputSchemaError
    );
    expect(mockGet).toBeCalledWith(request.modelId);
    expect(mockValidateSchema).toBeCalledWith(request.params.inputSchema);
    expect(mockUpdate).not.toBeCalled();
  });

  it('throw model not found', async () => {
    const request = {
      params: {
        name: 'testName',
        model: 'testModel',
        description: 'testDescription',
        prompt: 'testPrompt',
        inputSchema: {
          testInput: 'testInput',
        },
      },
      modelId: 'testId',
    };

    mockGet.mockImplementation(() => {
      throw new ModelNotFoundError();
    });
    mockUpdate.mockImplementation((model: Model) => model);
    mockValidateSchema.mockImplementation(() => void 0);

    const updateModelUseCase = new UpdateModelUseCase(
      mockModelRepository as IModelRepository,
      mockSchemaProvider as ISchemaProvider
    );

    await expect(updateModelUseCase.use(request)).rejects.toThrowError(
      ModelNotFoundError
    );
    expect(mockGet).toBeCalledWith(request.modelId);
    expect(mockValidateSchema).not.toBeCalled();
    expect(mockUpdate).not.toBeCalled();
  });
});
