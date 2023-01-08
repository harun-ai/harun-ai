import IUserRepository from '../../../../repository/userRepository/IUserRepository';
import User from '../../../entities/User';
import UserNotFoundError from '../../../errors/UserNotFoundError';
import DeleteUserUseCase from '../deleteUserUseCase';

describe('deleteUserUseCase', () => {
  const mockdelete = jest.fn();

  const mockUserRepository: Partial<IUserRepository> = {
    delete: mockdelete,
  };

  it('delete user', async () => {
    const userId = 'testId';

    const deleteUserUseCase = new DeleteUserUseCase(
      mockUserRepository as IUserRepository
    );

    await expect(deleteUserUseCase.use({ userId })).resolves.toBe(void 0);
    expect(mockdelete).toBeCalledWith(userId);
  });

  it('throw not found user', async () => {
    const userId = 'testId';

    mockdelete.mockImplementation(async (userId: User['id']) => {
      throw new UserNotFoundError(`User id: ${userId} not found`);
    });

    const deleteUserUseCase = new DeleteUserUseCase(
      mockUserRepository as IUserRepository
    );

    await expect(deleteUserUseCase.use({ userId })).rejects.toThrowError(
      UserNotFoundError
    );
    expect(mockdelete).toBeCalledWith(userId);
  });
});
