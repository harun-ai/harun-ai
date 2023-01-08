import IUserRepository from '../../../../repository/userRepository/IUserRepository';
import User from '../../../entities/User';
import UserNotFoundError from '../../../errors/UserNotFoundError';
import GetUserUseCase from '../getUserUseCase';

describe('getUserUseCase', () => {
  const mockGet = jest.fn();

  const mockUserRepository: Partial<IUserRepository> = {
    get: mockGet,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  it('get existent user', async () => {
    const user = {
      id: 'testId',
      name: 'test',
      email: 'test@test.com',
      password: 'encrypted',
    };

    mockGet.mockImplementation(async () => new User(user));

    const getUserUseCase = new GetUserUseCase(
      mockUserRepository as IUserRepository
    );

    await expect(getUserUseCase.use({ userId: user.id })).resolves.toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      models: undefined,
      verified: false,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
    expect(mockGet).toBeCalledWith(user.id);
  });

  it('throw not found user', async () => {
    const userId = 'testId';

    mockGet.mockImplementation(async (userId: User['id']) => {
      throw new UserNotFoundError(`User id: ${userId} not found`);
    });

    const getUserUseCase = new GetUserUseCase(
      mockUserRepository as IUserRepository
    );

    await expect(getUserUseCase.use({ userId })).rejects.toThrowError(
      UserNotFoundError
    );
    expect(mockGet).toBeCalledWith(userId);
  });
});
