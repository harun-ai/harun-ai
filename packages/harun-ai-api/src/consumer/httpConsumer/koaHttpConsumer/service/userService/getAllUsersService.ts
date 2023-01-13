import User from '../../../../../core/entities/User';
import GetAllUsersUseCase from '../../../../../core/useCase/user/getAllUsersUseCase';
import IService, { StatusCode } from '../IService';

export type ResponseType = Partial<Omit<User, 'password'>>[];

export default class GetAllUsersService implements IService<ResponseType> {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}

  async execute(): Promise<{
    success?: ResponseType | undefined;
    error?: { code: string; message: string } | undefined;
    statusCode: number;
  }> {
    try {
      return {
        success: await this.getAllUsersUseCase.use(),
        statusCode: StatusCode.OK,
      };
    } catch (error) {
      console.error(error);

      return {
        error: { code: 'INTERNAL_SERVER_ERROR', message: 'Unexpect error' },
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
