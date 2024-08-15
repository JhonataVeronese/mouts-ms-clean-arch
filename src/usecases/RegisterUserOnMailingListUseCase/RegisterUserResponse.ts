import { Either } from "@shared/either";
import { UserDataDTO } from "@entities/user/UserDataDTO";
import { InvalidNameError } from "@entities/user/errors/InvalidNameError";
import { InvalidEmailError } from "@entities/user/errors/InvalidEmailError";

export type RegisterUserResponse = Either<
  InvalidNameError | InvalidEmailError,
  UserDataDTO
>;
