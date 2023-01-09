import IModelRepository from '../../../../repository/modelRepository/IModelRepository';
import ModelNotFoundError from '../../../errors/ModelNotFoundError';
import DeleteModelUseCase from '../deleteModelUseCase';

describe('deleteModelsUseCase', () => {
  const mockDelete = jest.fn();

  const mockModelRepository: Partial<IModelRepository> = {
    delete: mockDelete,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  it('delete model', async () => {
    const modelId = 'testId';

    mockDelete.mockImplementation(() => void 0);

    const deleteModelsUseCase = new DeleteModelUseCase(
      mockModelRepository as IModelRepository
    );

    await expect(deleteModelsUseCase.use({ modelId })).resolves.toBe(void 0);
    expect(mockDelete).toBeCalledWith(modelId);
  });

  it('throw model not found', async () => {
    const modelId = 'testId';

    mockDelete.mockImplementation(() => {
      throw new ModelNotFoundError();
    });

    const deleteModelsUseCase = new DeleteModelUseCase(
      mockModelRepository as IModelRepository
    );

    await expect(deleteModelsUseCase.use({ modelId })).rejects.toThrowError(
      ModelNotFoundError
    );
    expect(mockDelete).toBeCalledWith(modelId);
  });
});
