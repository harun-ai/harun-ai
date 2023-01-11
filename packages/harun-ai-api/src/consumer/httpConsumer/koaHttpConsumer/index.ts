import { PrismaClient } from '@prisma/client';
import User from '../../../core/entities/User';
import CreateCompletionUseCase from '../../../core/useCase/model/createCompletionUseCase';
import CreateModelUseCase from '../../../core/useCase/model/createModelUseCase';
import DeleteModelUseCase from '../../../core/useCase/model/deleteModelUseCase';
import GetModelUseCase from '../../../core/useCase/model/getModelUseCase';
import ListModelsUseCase from '../../../core/useCase/model/listModelsUseCase';
import UpdateModelUseCase from '../../../core/useCase/model/updateModelUseCase';
import LoginUserUseCase from '../../../core/useCase/user/loginUserUseCase';
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  OPENAI_API_KEY,
} from '../../../envConfig';
import UuidProvider from '../../../provider/idProvider/UuidProvider';
import OpenAIModelPredictionProvider from '../../../provider/modelPredictionProvider/OpenAIModelPredictionProvider';
import IOneWayEncryptorProvider from '../../../provider/oneWayencryptorProvider/IOneWayEncryptorProvider';
import JsonSchemaProvider from '../../../provider/schemaProvider/JsonSchemaProvider';
import MustacheTemplateStringProvider from '../../../provider/templateStringProvider/MustacheTemplateStringProvider';
import ITwoWayEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ITwoWayEncryptorProvider';
import PrismaModelRepository from '../../../repository/modelRepository/prismaModelRepository';
import PrismaUserRepository from '../../../repository/userRepository/prismaUserRepository';

const schemaProvider = new JsonSchemaProvider();
const templateStringProvider = new MustacheTemplateStringProvider();
const modelPredictionProvider = new OpenAIModelPredictionProvider(
  OPENAI_API_KEY
);
const idProvider = new UuidProvider();
// const modelRepository = new StaticModelRepository(idProvider);

export const prisma = new PrismaClient();
const modelRepository = new PrismaModelRepository(prisma);

export const listModelsUseCase = new ListModelsUseCase(modelRepository);
export const getModelUseCase = new GetModelUseCase(modelRepository);
export const updateModelUseCase = new UpdateModelUseCase(
  modelRepository,
  schemaProvider
);
export const createModelUseCase = new CreateModelUseCase(
  modelRepository,
  schemaProvider,
  idProvider
);
export const deletModelUseCase = new DeleteModelUseCase(modelRepository);
export const createCompletionUseCase = new CreateCompletionUseCase(
  modelRepository,
  modelPredictionProvider,
  templateStringProvider,
  schemaProvider
);

const userRepository = new PrismaUserRepository(prisma);

const oneWayEncryptorProvider: IOneWayEncryptorProvider = {
  encrypt: async () => 'encyptedPass',
  compare: async (param: string) => param === 'test123',
};

export const user = new User({
  id: '75531e88-6cc1-41ef-b465-bd003687afea',
  name: 'admin',
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
});

user.verified = true;

export const twoWayEncryptorProvider: ITwoWayEncryptorProvider = {
  encrypt: async () => 'encyptedToken',
  decrypt: async () =>
    ({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as any),
};

export const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  oneWayEncryptorProvider
);
