import { RegisterUserController } from "./RegisterUserController";
import { MissingParamError, ServerError } from "./errors";
import { left, right } from "../../../shared/either";
import { IRegisterUser } from "../../../usecases/registerUserOnMailingListUseCase/IRegisterUser";
import { UserDataDTO } from "../../../entities/user/UserDataDTO";
import { RegisterUserResponse } from "../../../usecases/registerUserOnMailingListUseCase/RegisterUserResponse";
import { InvalidNameError } from "../../../entities/user/errors/InvalidNameError";

interface SutType {
  sut: RegisterUserController;
  registerUserStub: IRegisterUser;
}

const makeRegisterUser = (): IRegisterUser => {
  class RegisterUserOnMailingListStub implements IRegisterUser {
    async execute(user: UserDataDTO): Promise<RegisterUserResponse> {
      return await Promise.resolve(right(user));
    }
  }
  return new RegisterUserOnMailingListStub();
};

const makeSut = (): SutType => {
  const registerUserStub = makeRegisterUser();
  const sut = new RegisterUserController(registerUserStub);
  return { sut, registerUserStub };
};

describe("Register User Controller", () => {
  test("should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name").message);
  });

  test("should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email").message);
  });

  test("should return 500 if register user throws", async () => {
    const { sut, registerUserStub } = makeSut();
    jest.spyOn(registerUserStub, "execute").mockImplementation(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toEqual(500);
    expect((response.body as ServerError).message).toEqual(
      "Server error: internal."
    );
  });
});
