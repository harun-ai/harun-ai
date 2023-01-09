import IModelRepository from '../../../../repository/modelRepository/IModelRepository';
import Model from '../../../entities/Model';
import ModelNotFoundError from '../../../errors/ModelNotFoundError';
import GetModelUseCase from '../getModelUseCase';

describe('getModelsUseCase', () => {
  const mockGet = jest.fn();

  const mockModelRepository: Partial<IModelRepository> = {
    get: mockGet,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  it('get model', async () => {
    const modelId = 'testId';

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

    mockGet.mockImplementation(() => model);

    const getModelsUseCase = new GetModelUseCase(
      mockModelRepository as IModelRepository
    );

    await expect(getModelsUseCase.use({ modelId })).resolves.toEqual(model);
    expect(mockGet).toBeCalledWith(modelId);
  });

  it('throw model not found', async () => {
    const modelId = 'testId';

    mockGet.mockImplementation(() => {
      throw new ModelNotFoundError();
    });

    const getModelsUseCase = new GetModelUseCase(
      mockModelRepository as IModelRepository
    );

    await expect(getModelsUseCase.use({ modelId })).rejects.toThrowError(
      ModelNotFoundError
    );
    expect(mockGet).toBeCalledWith(modelId);
  });
});
