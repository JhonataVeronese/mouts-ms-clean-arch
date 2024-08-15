import { UserDataDTO } from "../../entities/User/UserDataDTO";

export interface IUserRepository {
  findAllUsers: () => Promise<UserDataDTO[]>;
  findUserByEmail: (email: string) => Promise<UserDataDTO>;
  add: (user: UserDataDTO) => Promise<void>;
  exists: (email: string) => Promise<boolean>;
}
