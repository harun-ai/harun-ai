import { PrismaClient } from '@prisma/client';
import CreateCompletionUseCase from '../../../core/useCase/model/createCompletionUseCase';
import CreateModelUseCase from '../../../core/useCase/model/createModelUseCase';
import DeleteModelUseCase from '../../../core/useCase/model/deleteModelUseCase';
import GetModelUseCase from '../../../core/useCase/model/getModelUseCase';
import ListModelsUseCase from '../../../core/useCase/model/listModelsUseCase';
import UpdateModelUseCase from '../../../core/useCase/model/updateModelUseCase';
import ListPredictionsUseCase from '../../../core/useCase/prediction/listPredictionsUseCase';
import CreateUserUseCase from '../../../core/useCase/user/createUserUseCase';
import DeleteUserUseCase from '../../../core/useCase/user/deleteUserUseCase';
import ForgotPasswordUseCase from '../../../core/useCase/user/forgotPasswordUseCase';
import GetAllUsersUseCase from '../../../core/useCase/user/getAllUsersUseCase';
import InviteFriendUseCase from '../../../core/useCase/user/inviteFriendUseCase';
import LoginUserUseCase from '../../../core/useCase/user/loginUserUseCase';
import ResetPasswordUseCase from '../../../core/useCase/user/resetPasswordUseCase';
import UpdateUserUseCase from '../../../core/useCase/user/updateUserUseCase';
import VerifyEmailUseCase from '../../../core/useCase/user/verifyEmailUseCase';
import {
  API_SECRET_KEY,
  OPENAI_API_KEY,
  SENDGRID_API_KEY,
} from '../../../envConfig';
import SendgridEmailProvider from '../../../provider/emailProvider/sendgridEmailProvider';
import UuidProvider from '../../../provider/idProvider/UuidProvider';
import OpenAIModelPredictionProvider from '../../../provider/modelPredictionProvider/OpenAIModelPredictionProvider';
import BcryptEncriptorProvider from '../../../provider/oneWayencryptorProvider/bcryptEncryptorProvider';
import JsonSchemaProvider from '../../../provider/schemaProvider/JsonSchemaProvider';
import MustacheTemplateStringProvider from '../../../provider/templateStringProvider/MustacheTemplateStringProvider';
import IronSessionEncryptorProvider from '../../../provider/twoWayEncrytorProvider/ironSessionEncryptorProvider';
import PrismaModelRepository from '../../../repository/modelRepository/prismaModelRepository';
import PrismaPredictionRepository from '../../../repository/predictionRepository/prismaPredictionRepository';
import PrismaUserRepository from '../../../repository/userRepository/prismaUserRepository';

const schemaProvider = new JsonSchemaProvider();
const templateStringProvider = new MustacheTemplateStringProvider();
const modelPredictionProvider = new OpenAIModelPredictionProvider(
  OPENAI_API_KEY
);
const idProvider = new UuidProvider();

export const prisma = new PrismaClient();
const modelRepository = new PrismaModelRepository(prisma);
const predictionRepository = new PrismaPredictionRepository(prisma);

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
  schemaProvider,
  idProvider,
  predictionRepository
);

const userRepository = new PrismaUserRepository(prisma);

const oneWayEncryptorProvider = new BcryptEncriptorProvider();

export const twoWayEncryptorProvider = new IronSessionEncryptorProvider(
  API_SECRET_KEY
);

export const emailProvider = new SendgridEmailProvider(SENDGRID_API_KEY);

export const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  oneWayEncryptorProvider
);
export const createUserUseCase = new CreateUserUseCase(
  userRepository,
  oneWayEncryptorProvider,
  idProvider,
  emailProvider,
  twoWayEncryptorProvider
);
export const deleteUserUseCase = new DeleteUserUseCase(userRepository);
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
export const verifyEmailUseCase = new VerifyEmailUseCase(
  userRepository,
  twoWayEncryptorProvider
);
export const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  twoWayEncryptorProvider,
  emailProvider
);
export const resetPasswordUseCase = new ResetPasswordUseCase(
  twoWayEncryptorProvider,
  userRepository,
  oneWayEncryptorProvider
);
export const updateUserUseCase = new UpdateUserUseCase(
  userRepository,
  oneWayEncryptorProvider,
  emailProvider,
  twoWayEncryptorProvider
);

export const inviteFriendUseCase = new InviteFriendUseCase(emailProvider);

export const listPredictionsUseCase = new ListPredictionsUseCase(
  predictionRepository
);
