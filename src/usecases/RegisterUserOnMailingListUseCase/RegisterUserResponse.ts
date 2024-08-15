import { Either } from "../../shared/either";
import { InvalidEmailError } from "../../entities/User/errors/invalid-email";
import { InvalidNameError } from "../../entities/User/errors/invalid-name";
import { UserDataDTO } from "../../entities/User/UserDataDTO";

export type RegisterUserResponse = Either<
  InvalidNameError | InvalidEmailError,
  UserDataDTO
>;
