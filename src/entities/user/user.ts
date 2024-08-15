import { Name } from "./Name";
import { Email } from "./Email";
import { UserDataDTO } from "./UserDataDTO";
import { Either, left, right } from "@shared/either";
import { InvalidNameError } from "./errors/InvalidNameError";
import { InvalidEmailError } from "./errors/InvalidEmailError";

export class User {
  public readonly name: Name;
  public readonly email: Email;

  private constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
    Object.freeze(this);
  }

  static create(
    userData: UserDataDTO
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(
      userData.name
    );
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(
      userData.email
    );
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }
    const name: Name = nameOrError.value;
    const email: Email = emailOrError.value;
    return right(new User(name, email));
  }
}
