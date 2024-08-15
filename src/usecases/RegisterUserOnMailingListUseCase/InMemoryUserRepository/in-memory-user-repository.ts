import { UserRepository } from "../../ports/user-repository";
import { UserDataDTO } from "../../../entities/User/UserDataDTO";

export class InMemoryUserRepository implements UserRepository {
  users: UserDataDTO[] = [];
  constructor(users: UserDataDTO[]) {
    this.users = users;
  }

  async findAllUsers(): Promise<UserDataDTO[]> {
    return this.users;
  }

  async findUserByEmail(email: string): Promise<UserDataDTO> {
    var u: UserDataDTO;
    for (u of this.users) {
      if (u.email === email) {
        return u;
      }
    }
    return null;
  }

  async exists(email: string): Promise<boolean> {
    if ((await this.findUserByEmail(email)) == null) {
      return false;
    }
    return true;
  }

  async add(user: UserDataDTO): Promise<void> {
    const exists = await this.exists(user.email);
    if (!exists) {
      this.users.push(user);
    }
  }
}
