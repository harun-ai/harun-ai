import IPredictionRepository from '../../../repository/predictionRepository/IPredictionRepository';
import IUserRepository from '../../../repository/userRepository/IUserRepository';
import Prediction from '../../entities/Prediction';
import User from '../../entities/User';
import InvalidUserCredentialsError from '../../errors/InvalidUserCreadentialsError';
import IUseCase from '../IUseCase';

export type EvaluatePredictionUseCaseDTO = {
  Request: {
    userId: User['id'];
    predictionId: Prediction['id'];
    liked: boolean;
  };
  Response: void;
};

export default class EvaluatePredictionUseCase
  implements IUseCase<EvaluatePredictionUseCaseDTO>
{
  constructor(
    private userRepository: IUserRepository,
    private predictionRepository: IPredictionRepository
  ) {}

  async use({
    userId,
    predictionId,
    liked,
  }: EvaluatePredictionUseCaseDTO['Request']): Promise<
    EvaluatePredictionUseCaseDTO['Response']
  > {
    const { password, ...user } = await this.userRepository.get(userId);
    const prediction = await this.predictionRepository.get(predictionId);

    if (user.id !== prediction.userId)
      throw new InvalidUserCredentialsError('User do not match');

    await this.predictionRepository.evaluate(predictionId, liked);
  }
}
