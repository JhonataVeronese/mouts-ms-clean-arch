import { RegisterUserResponse } from "./RegisterUserResponse";
import { UserDataDTO } from "../../entities/User/UserDataDTO";

export interface IRegisterUser {
  registerUserOnMailingListUseCase: (
    user: UserDataDTO
  ) => Promise<RegisterUserResponse>;
}
