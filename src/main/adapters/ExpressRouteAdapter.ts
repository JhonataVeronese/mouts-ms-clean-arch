import { RegisterUserController } from "../../adapters/presentation/controllers/RegisterUserController";
import { Request, Response } from "express";
import { IHttpRequest } from "../../adapters/presentation/controllers/interface/http";

export const adaptRoute = (controller: RegisterUserController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
