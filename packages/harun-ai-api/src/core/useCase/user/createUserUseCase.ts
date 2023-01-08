import IEncryptorProvider from '../../../provider/encryptorProvider/IEncryptorProvider';
import IdProvider from '../../../provider/idProvider/IdProvider';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import User from '../../entities/User';
import IUseCase from '../IUseCase';

export type CreateUserUseCaseDTO = {
  Request: Omit<
    User,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'update'
    | 'isVerified'
    | 'setVerified'
    | 'setUnverified'
  >;
  Response: Omit<
    User,
    'password' | 'update' | 'isVerified' | 'setVerified' | 'setUnverified'
  >;
};

export default class CreateUserUseCase
  implements IUseCase<CreateUserUseCaseDTO>
{
  constructor(
    private userRepository: IUserRepository,
    private encryptorProvider: IEncryptorProvider,
    private idProvider: IdProvider
  ) {}

  async use(
    request: CreateUserUseCaseDTO['Request']
  ): Promise<CreateUserUseCaseDTO['Response']> {
    if (request.password) {
      request.password = await this.encryptorProvider.encrypt(request.password);
    }

    const id = await this.idProvider.generateId();

    const user = new User({ ...request, id });

    const response = { ...(await this.userRepository.save(user)) };

    delete response.password;

    return response;
  }
}
