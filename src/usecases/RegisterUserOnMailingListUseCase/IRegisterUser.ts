import { UserDataDTO } from "@entities/user/UserDataDTO";
import { RegisterUserResponse } from "./RegisterUserResponse";

export interface IRegisterUser {
  execute: (user: UserDataDTO) => Promise<RegisterUserResponse>;
}
