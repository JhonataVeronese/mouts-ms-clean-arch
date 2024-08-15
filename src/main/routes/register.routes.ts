/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { makeRegisterUserController } from "../factories/user/RegisterUser";
import { adaptRoute } from "../adapters/ExpressRouteAdapter";

export default (router: Router): void => {
  router.post("/register-user", adaptRoute(makeRegisterUserController()));
};
