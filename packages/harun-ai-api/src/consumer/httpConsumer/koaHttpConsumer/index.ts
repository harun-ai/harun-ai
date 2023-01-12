import { PrismaClient } from '@prisma/client';
import CreateCompletionUseCase from '../../../core/useCase/model/createCompletionUseCase';
import CreateModelUseCase from '../../../core/useCase/model/createModelUseCase';
import DeleteModelUseCase from '../../../core/useCase/model/deleteModelUseCase';
import GetModelUseCase from '../../../core/useCase/model/getModelUseCase';
import ListModelsUseCase from '../../../core/useCase/model/listModelsUseCase';
import UpdateModelUseCase from '../../../core/useCase/model/updateModelUseCase';
import LoginUserUseCase from '../../../core/useCase/user/loginUserUseCase';
import {
  API_SECRET_KEY,
  OPENAI_API_KEY,
  SENDGRID_API_KEY,
} from '../../../envConfig';
import SendgridEmailProvider from '../../../provider/emailProvider/sendgridEmailProvider';
import UuidProvider from '../../../provider/idProvider/UuidProvider';
import OpenAIModelPredictionProvider from '../../../provider/modelPredictionProvider/OpenAIModelPredictionProvider';
import IOneWayEncryptorProvider from '../../../provider/oneWayencryptorProvider/IOneWayEncryptorProvider';
import JsonSchemaProvider from '../../../provider/schemaProvider/JsonSchemaProvider';
import MustacheTemplateStringProvider from '../../../provider/templateStringProvider/MustacheTemplateStringProvider';
import IronSessionEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ironSessionEncryptorProvider';
import PrismaModelRepository from '../../../repository/modelRepository/prismaModelRepository';
import PrismaUserRepository from '../../../repository/userRepository/prismaUserRepository';

const schemaProvider = new JsonSchemaProvider();
const templateStringProvider = new MustacheTemplateStringProvider();
const modelPredictionProvider = new OpenAIModelPredictionProvider(
  OPENAI_API_KEY
);
const idProvider = new UuidProvider();

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

export const twoWayEncryptorProvider = new IronSessionEncryptorProvider(
  API_SECRET_KEY
);

export const emailProvider = new SendgridEmailProvider(SENDGRID_API_KEY);

export const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  oneWayEncryptorProvider
);
