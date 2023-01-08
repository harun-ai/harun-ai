import IUserRepository from '../../../repository/userRepository/IUserRepository';
import User from '../../entities/User';
import IUseCase from '../IUseCase';

export type DeleteUserUseCaseDTO = {
  Request: {
    userId: User['id'];
  };
  Response: void;
};

export default class DeleteUserUseCase
  implements IUseCase<DeleteUserUseCaseDTO>
{
  constructor(private userRepository: IUserRepository) {}

  async use({ userId }: { userId: User['id'] }): Promise<void> {
    return this.userRepository.delete(userId);
  }
}
