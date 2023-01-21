import IEncryptorProvider from '../../../../provider/oneWayencryptorProvider/IOneWayEncryptorProvider';
import IUserRepository from '../../../../repository/userRepository/IUserRepository';
import User from '../../../entities/User';
import UserNotFoundError from '../../../errors/UserNotFoundError';
import UserPasswordDoNotMatchError from '../../../errors/UserPasswordDoNotMatchError';
import UpdateUserUseCase from '../updateUserUseCase';

describe('updateUserUseCase', () => {
  const mockUpdate = jest.fn();
  const mockGet = jest.fn();
  const mockCompare = jest.fn();

  const mockUserRepository: Partial<IUserRepository> = {
    update: mockUpdate,
    get: mockGet,
  };

  const mockEncryptProvider: Partial<IEncryptorProvider> = {
    compare: mockCompare,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  beforeEach(() => {
    mockUpdate.mockClear();
    mockGet.mockClear();
    mockCompare.mockClear();
  });

  it('update user with valid password', async () => {
    const request = {
      params: {
        name: 'test',
        email: 'test@test.com',
      },
      userId: 'testId',
      userPassword: 'testPassword',
    };

    const encrypedPassword = 'encrypted';

    mockCompare.mockImplementation(async () => true);
    mockGet.mockImplementation(async () => {
      const user = new User({
        id: request.userId,
        name: 'oldName',
        email: 'oldEmail',
        password: encrypedPassword,
      });

      user.verified = true;

      return user;
    });
    mockUpdate.mockImplementation((user: User) => user);

    const updateUserUseCase = new UpdateUserUseCase(
      mockUserRepository as IUserRepository,
      mockEncryptProvider as IEncryptorProvider
    );

    await expect(updateUserUseCase.use(request)).resolves.toEqual({
      id: request.userId,
      name: request.params.name,
      email: request.params.email,
      verified: false,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
    expect(mockGet).toBeCalledWith(request.userId);
    expect(mockUpdate).toBeCalledWith({
      id: request.userId,
      name: request.params.name,
      email: request.params.email,
      password: encrypedPassword,
      verified: false,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
    expect(mockCompare).toBeCalledWith(request.userPassword, encrypedPassword);
  });

  it('throw not found user', async () => {
    const request = {
      params: {
        name: 'test',
        email: 'test@test.com',
      },
      userId: 'testId',
      userPassword: 'testPassword',
    };

    mockGet.mockImplementation(async () => {
      throw new UserNotFoundError();
    });

    const updateUserUseCase = new UpdateUserUseCase(
      mockUserRepository as IUserRepository,
      mockEncryptProvider as IEncryptorProvider
    );

    await expect(updateUserUseCase.use(request)).rejects.toThrowError(
      UserNotFoundError
    );
    expect(mockGet).toBeCalledWith(request.userId);
    expect(mockUpdate).not.toBeCalled();
    expect(mockCompare).not.toBeCalled();
  });

  it('throw password to not match', async () => {
    const request = {
      params: {
        name: 'test',
        email: 'test@test.com',
      },
      userId: 'testId',
      userPassword: 'testPassword',
    };

    const encrypedPassword = 'encrypted';

    mockCompare.mockImplementation(async () => false);
    mockGet.mockImplementation(async () => {
      const user = new User({
        id: request.userId,
        name: 'oldName',
        email: 'oldEmail',
        password: encrypedPassword,
      });

      user.verified = true;

      return user;
    });
    mockUpdate.mockImplementation((user: User) => user);

    const updateUserUseCase = new UpdateUserUseCase(
      mockUserRepository as IUserRepository,
      mockEncryptProvider as IEncryptorProvider
    );

    await expect(updateUserUseCase.use(request)).rejects.toThrowError(
      UserPasswordDoNotMatchError
    );
    expect(mockGet).toBeCalledWith(request.userId);
    expect(mockCompare).toBeCalledWith(request.userPassword, encrypedPassword);
    expect(mockUpdate).not.toBeCalled();
  });

  it('update user without email', async () => {
    const request = {
      params: {
        name: 'test',
      },
      userId: 'testId',
      userPassword: 'testPassword',
    };

    const encrypedPassword = 'encrypted';

    mockCompare.mockImplementation(async () => true);
    mockGet.mockImplementation(async () => {
      const user = new User({
        id: request.userId,
        name: 'oldName',
        email: 'oldEmail',
        password: encrypedPassword,
      });

      user.verified = true;

      return user;
    });
    mockUpdate.mockImplementation((user: User) => user);

    const updateUserUseCase = new UpdateUserUseCase(
      mockUserRepository as IUserRepository,
      mockEncryptProvider as IEncryptorProvider
    );

    await expect(updateUserUseCase.use(request)).resolves.toEqual({
      id: request.userId,
      name: request.params.name,
      email: 'oldEmail',
      verified: true,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
    expect(mockGet).toBeCalledWith(request.userId);
    expect(mockUpdate).toBeCalledWith({
      id: request.userId,
      name: request.params.name,
      email: 'oldEmail',
      password: encrypedPassword,
      verified: true,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
    expect(mockCompare).toBeCalledWith(request.userPassword, encrypedPassword);
  });
});
