import IdProvider from '../../../../provider/idProvider/IdProvider';
import ISchemaProvider from '../../../../provider/schemaProvider/ISchemaProvider';
import IModelRepository from '../../../../repository/modelRepository/IModelRepository';
import Model from '../../../entities/Model';
import InvalidInputSchemaError from '../../../errors/InvalidInputSchemaError';
import ModelAlreadyExistsError from '../../../errors/ModelAlreadyExistsError';
import CreateModelUseCase from '../createModelUseCase';

describe('createModelUseCase', () => {
  const mockSave = jest.fn();
  const mockValidateSchema = jest.fn();
  const mockGenerateId = jest.fn();

  const mockModelRepository: Partial<IModelRepository> = {
    save: mockSave,
  };

  const mockSchemaProvider: Partial<ISchemaProvider> = {
    validateSchema: mockValidateSchema,
  };

  const mockIdProvider: Partial<IdProvider> = {
    generateId: mockGenerateId,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  beforeEach(() => {
    mockGenerateId.mockClear();
    mockSave.mockClear();
    mockValidateSchema.mockClear();
  });

  it('create model', async () => {
    const id = 'testId';
    const request = {
      name: 'testName',
      model: 'testModel',
      description: 'testDescription',
      prompt: 'testPrompt',
      inputSchema: {
        testInput: 'testInput',
      },
    };

    mockSave.mockImplementation((model: Model) => model);
    mockGenerateId.mockImplementation(() => id);
    mockValidateSchema.mockImplementation(() => void 0);

    const createModelUseCase = new CreateModelUseCase(
      mockModelRepository as IModelRepository,
      mockSchemaProvider as ISchemaProvider,
      mockIdProvider as IdProvider
    );

    await expect(createModelUseCase.use(request)).resolves.toEqual({
      id,
      ...request,
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
    expect(mockGenerateId).toBeCalledTimes(1);
    expect(mockValidateSchema).toBeCalledWith(request.inputSchema);
    expect(mockSave).toBeCalledWith({
      id,
      ...request,
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
    const id = 'testId';
    const request = {
      name: 'testName',
      model: 'testModel',
      description: 'testDescription',
      prompt: 'testPrompt',
      inputSchema: {
        testInput: 'testInput',
      },
    };

    mockSave.mockImplementation((model: Model) => model);
    mockGenerateId.mockImplementation(() => id);
    mockValidateSchema.mockImplementation(() => {
      throw new Error();
    });

    const createModelUseCase = new CreateModelUseCase(
      mockModelRepository as IModelRepository,
      mockSchemaProvider as ISchemaProvider,
      mockIdProvider as IdProvider
    );

    await expect(createModelUseCase.use(request)).rejects.toThrowError(
      InvalidInputSchemaError
    );
    expect(mockGenerateId).not.toBeCalled();
    expect(mockValidateSchema).toBeCalledWith(request.inputSchema);
    expect(mockSave).not.toBeCalled();
  });

  it('throw existent model', async () => {
    const id = 'testId';
    const request = {
      name: 'testName',
      model: 'testModel',
      description: 'testDescription',
      prompt: 'testPrompt',
      inputSchema: {
        testInput: 'testInput',
      },
    };

    mockSave.mockImplementation(() => {
      throw new ModelAlreadyExistsError();
    });
    mockGenerateId.mockImplementation(() => id);
    mockValidateSchema.mockImplementation(() => void 0);

    const createModelUseCase = new CreateModelUseCase(
      mockModelRepository as IModelRepository,
      mockSchemaProvider as ISchemaProvider,
      mockIdProvider as IdProvider
    );

    await expect(createModelUseCase.use(request)).rejects.toThrowError(
      ModelAlreadyExistsError
    );
    expect(mockGenerateId).toBeCalledTimes(1);
    expect(mockValidateSchema).toBeCalledWith(request.inputSchema);
    expect(mockSave).toBeCalledWith({
      id,
      ...request,
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
});
