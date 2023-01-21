import IUserRepository from '../../../repository/userRepository/IUserRepository';
import User from '../../entities/User';
import IUseCase from '../IUseCase';

export type GetAllUsersUseCaseDTO = {
  Request: void;
  Response: Partial<Omit<User, 'password'>>[];
};

export default class GetAllUsersUseCase
  implements IUseCase<GetAllUsersUseCaseDTO>
{
  constructor(private userRepository: IUserRepository) {}

  async use(): Promise<GetAllUsersUseCaseDTO['Response']> {
    const users = (await this.userRepository.getAll()).map(
      ({ password: _, ...user }) => user
    );

    return users;
  }
}
