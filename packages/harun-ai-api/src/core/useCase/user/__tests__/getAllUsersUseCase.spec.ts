import IUserRepository from '../../../../repository/userRepository/IUserRepository';
import User from '../../../entities/User';
import GetAllUsersUseCase from '../getAllUsersUseCase';

describe('getAllUsersUseCase', () => {
  const mockGetAll = jest.fn();

  const mockUserRepository: Partial<IUserRepository> = {
    getAll: mockGetAll,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  it('get all users', async () => {
    const user = {
      id: 'testId',
      name: 'test',
      email: 'test@test.com',
      password: 'encrypted',
    };

    mockGetAll.mockImplementation(async () => [new User(user)]);

    const getAllUsersUseCase = new GetAllUsersUseCase(
      mockUserRepository as IUserRepository
    );

    await expect(getAllUsersUseCase.use()).resolves.toEqual([
      {
        id: user.id,
        name: user.name,
        email: user.email,
        models: undefined,
        verified: false,
        createdAt: mockDate,
        updatedAt: mockDate,
      },
    ]);
    expect(mockGetAll).toBeCalledTimes(1);
  });
});
