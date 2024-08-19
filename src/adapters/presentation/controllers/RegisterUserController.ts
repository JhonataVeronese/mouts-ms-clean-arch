import { IHttpRequest, IHttpResponse } from "./interface/http";
import { MissingParamError } from "./errors/MissingParamError";
import { badRequest, serverError, ok } from "./helpers/HttpHelper";
import { IRegisterUser } from "../../../usecases/registerUserOnMailingListUseCase/IRegisterUser";
import { RegisterUserResponse } from "../../../usecases/registerUserOnMailingListUseCase/RegisterUserResponse";

export class RegisterUserController {
  private readonly registerUser: IRegisterUser;

  constructor(registerUser: IRegisterUser) {
    this.registerUser = registerUser;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      if (!httpRequest.body.name || !httpRequest.body.email) {
        const field = !httpRequest.body.name ? "name" : "email";
        return badRequest(new MissingParamError(field));
      }

      const userData = {
        name: httpRequest.body.name,
        email: httpRequest.body.email,
      };

      const registerUserResponse: RegisterUserResponse =
        await this.registerUser.execute(userData);
      if (registerUserResponse.isLeft()) {
        return badRequest(registerUserResponse.value);
      }

      return ok(userData);
    } catch (error) {
      return serverError("internal");
    }
  }
}
