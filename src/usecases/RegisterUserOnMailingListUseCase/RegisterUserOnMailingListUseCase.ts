import { UserDataDTO } from "../../entities/User/UserDataDTO";
import { left, right, Either } from "../../shared/either";
import { IRegisterUser } from "./IRegisterUser";
import { RegisterUserResponse } from "./RegisterUserResponse";
import { IUserRepository } from "../interface/IUserRepository";
import { User } from "../../entities/User/User";
import { InvalidNameError } from "../../entities/user/errors/invalid-name";
import { InvalidEmailError } from "../../entities/user/errors/invalid-email";

export class RegisterUserOnMailingListUseCase implements IRegisterUser {
  private readonly userRepository: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepository = userRepo;
  }

  async registerUserOnMailingListUseCase(
    userData: UserDataDTO
  ): Promise<RegisterUserResponse> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(userData);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;
    const exists = await this.userRepository.exists(user.email.value);
    if (!exists.valueOf()) {
      await this.userRepository.add({
        name: user.name.value,
        email: user.email.value,
      });
    }
    return right(userData);
  }
}
