import { UserDataDTO } from "../../entities/user/UserDataDTO";
import { IUserRepository } from "../interface/IUserRepository";
import { InMemoryUserRepository } from "./InMemoryUserRepository/InMemoryUserRepository";
import { InvalidNameError } from "../../entities/user/errors/InvalidNameError";
import { InvalidEmailError } from "../../entities/user/errors/InvalidEmailError";
import { RegisterUserOnMailingListUseCase } from "../registerUserOnMailingListUseCase/RegisterUserOnMailingListUseCase";

describe("Register user on mailing list use case", () => {
  test("should register new user on mailing list with complete data", async () => {
    const name = "any_name";
    const email = "any_email@mail.com";
    var users: UserDataDTO[] = [];
    const repo: IUserRepository = new InMemoryUserRepository(users);
    const sut = new RegisterUserOnMailingListUseCase(repo);
    const response = await sut.execute({
      name,
      email,
    });
    const user = repo.findUserByEmail(email);
    expect((await user).email).toEqual("any_email@mail.com");
    expect(response.isRight()).toBeTruthy();
  });

  test("should not register new user with empty name", async () => {
    const name = "";
    const email = "any_email@mail.com";
    var users: UserDataDTO[] = [];
    const repo: IUserRepository = new InMemoryUserRepository(users);
    const sut = new RegisterUserOnMailingListUseCase(repo);
    const error = await sut.execute({ name, email });
    expect(error.value).toEqual(new InvalidNameError(name));
    expect(error.isLeft()).toBeTruthy();
  });

  test("should not register new user with invalid name", async () => {
    const name = "O";
    const email = "any_email@mail.com";
    var users: UserDataDTO[] = [];
    const repo: IUserRepository = new InMemoryUserRepository(users);
    const sut = new RegisterUserOnMailingListUseCase(repo);
    const error = await sut.execute({ name, email });
    expect(error.value).toEqual(new InvalidNameError(name));
  });

  test("should not register new user with empty email", async () => {
    const name = "any_name";
    const email = "";
    var users: UserDataDTO[] = [];
    const repo: IUserRepository = new InMemoryUserRepository(users);
    const sut = new RegisterUserOnMailingListUseCase(repo);
    const error = await sut.execute({ name, email });
    expect(error.value).toEqual(new InvalidEmailError(email));
  });

  test("should not register new user with undefined email", async () => {
    const name = "any_name";
    let email: string;
    var users: UserDataDTO[] = [];
    const repo: IUserRepository = new InMemoryUserRepository(users);
    const sut = new RegisterUserOnMailingListUseCase(repo);
    const error = await sut.execute({ name, email });
    expect(error.value).toEqual(new InvalidEmailError(email));
  });
});
