import IEncryptorProvider from '../../../../provider/encryptorProvider/IEncryptorProvider';
import IdProvider from '../../../../provider/idProvider/IdProvider';
import IUserRepository from '../../../../repository/userRepository/IUserRepository';
import User from '../../../entities/User';
import UserAlreadyExistsError from '../../../errors/UserAlreadyExistsError';
import CreateUserUseCase from '../createUserUseCase';

describe('createUserUseCase', () => {
  const mockSave = jest.fn();
  const mockEncrypt = jest.fn();
  const mockGenerateId = jest.fn();

  const mockUserRepository: Partial<IUserRepository> = {
    save: mockSave,
  };

  const mockEncryptProvider: Partial<IEncryptorProvider> = {
    encrypt: mockEncrypt,
  };

  const mockIdProvider: Partial<IdProvider> = {
    generateId: mockGenerateId,
  };

  const mockDate = new Date('2021-02-26T20:42:16.652Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  beforeEach(() => {
    mockEncrypt.mockClear();
    mockGenerateId.mockClear();
    mockSave.mockClear();
  });

  it('create user', async () => {
    const request = {
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    };

    const id = 'testId';
    const encrypedPassword = 'encrypted';

    mockSave.mockImplementation(async (user: User) => user);
    mockEncrypt.mockImplementation(async () => encrypedPassword);
    mockGenerateId.mockImplementation(async () => id);

    const createUserUseCase = new CreateUserUseCase(
      mockUserRepository as IUserRepository,
      mockEncryptProvider as IEncryptorProvider,
      mockIdProvider as IdProvider
    );

    await expect(createUserUseCase.use(request)).resolves.toEqual({
      id,
      name: request.name,
      email: request.email,
      models: undefined,
      verified: false,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
    expect(mockSave).toBeCalledWith({
      id,
      name: request.name,
      email: request.email,
      models: undefined,
      verified: false,
      password: encrypedPassword,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
    expect(mockEncrypt).toBeCalledWith('test');
    expect(mockGenerateId).toBeCalledTimes(1);
  });

  it('throw user already exists', async () => {
    const request = {
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    };

    const id = 'testId';
    const encrypedPassword = 'encrypted';

    mockSave.mockImplementation(async (user: User) => {
      throw new UserAlreadyExistsError(
        `User email: ${user.email} already exists`
      );
    });
    mockEncrypt.mockImplementation(async () => encrypedPassword);
    mockGenerateId.mockImplementation(async () => id);

    const createUserUseCase = new CreateUserUseCase(
      mockUserRepository as IUserRepository,
      mockEncryptProvider as IEncryptorProvider,
      mockIdProvider as IdProvider
    );

    await expect(createUserUseCase.use(request)).rejects.toThrowError(
      UserAlreadyExistsError
    );
    expect(mockSave).toBeCalledWith({
      id,
      name: request.name,
      email: request.email,
      models: undefined,
      verified: false,
      password: encrypedPassword,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
    expect(mockEncrypt).toBeCalledWith('test');
    expect(mockGenerateId).toBeCalledTimes(1);
  });
});
