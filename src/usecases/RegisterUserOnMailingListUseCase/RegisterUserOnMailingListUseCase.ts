import { IUserRepository } from "../interface/IUserRepository";
import { IRegisterUser } from "./IRegisterUser";
import { Either, left, right } from "@shared/either";
import { InvalidNameError } from "@entities/user/errors/InvalidNameError";
import { InvalidEmailError } from "@entities/user/errors/InvalidEmailError";
import { UserDataDTO } from "@entities/user/UserDataDTO";
import { User } from "@entities/user/User";
import { RegisterUserResponse } from "./RegisterUserResponse";

export class RegisterUserOnMailingListUseCase implements IRegisterUser {
  private readonly userRepository: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepository = userRepo;
  }

  async execute(userData: UserDataDTO): Promise<RegisterUserResponse> {
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
