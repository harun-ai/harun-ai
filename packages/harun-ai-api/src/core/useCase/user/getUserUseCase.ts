import IUserRepository from '../../../repository/userRepository/IUserRepository';
import User from '../../entities/User';
import IUseCase from '../IUseCase';

export type GetUserUseCaseDTO = {
  Request: {
    userId: User['id'];
  };
  Response: Omit<User, 'password'>;
};

export default class GetUserUseCase implements IUseCase<GetUserUseCaseDTO> {
  constructor(private userRepository: IUserRepository) {}

  async use({
    userId,
  }: {
    userId: User['id'];
  }): Promise<GetUserUseCaseDTO['Response']> {
    const response = await this.userRepository.get(userId);

    delete response.password;

    return response;
  }
}
