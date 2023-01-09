import IModelRepository from '../../../../repository/modelRepository/IModelRepository';
import Model from '../../../entities/Model';
import ListModelsUseCase from '../listModelsUseCase';

describe('listModelsUseCase', () => {
  const mockGetAll = jest.fn();

  const mockModelRepository: Partial<IModelRepository> = {
    getAll: mockGetAll,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  it('list models', async () => {
    const model = new Model({
      id: 'testId',
      name: 'testName',
      model: 'testModel',
      description: 'testDescription',
      prompt: 'testPrompt',
      inputSchema: {
        testInput: 'testInput',
      },
    });

    mockGetAll.mockImplementation(() => [model]);

    const listModelsUseCase = new ListModelsUseCase(
      mockModelRepository as IModelRepository
    );

    await expect(listModelsUseCase.use()).resolves.toEqual([model]);
    expect(mockGetAll).toBeCalledTimes(1);
  });
});
