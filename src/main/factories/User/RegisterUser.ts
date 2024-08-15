import { RegisterUserController } from "../../../adapters/presentation/controllers/RegisterUserController";
import { RegisterUserOnMailingListUseCase } from "../../../usecases/registerUserOnMailingListUseCase/RegisterUserOnMailingListUseCase";
import { MongodbUserRepository } from "../../../external/repositories/mongodb/MongodbUserRepository";

export const makeRegisterUserController = (): RegisterUserController => {
  const mongodbUserRepository = new MongodbUserRepository();
  const registerUserOnMailingList = new RegisterUserOnMailingListUseCase(
    mongodbUserRepository
  );
  return new RegisterUserController(registerUserOnMailingList);
};
