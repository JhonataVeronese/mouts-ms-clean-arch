export class MissingParamError extends Error implements IControllerError {
  constructor(paramName: string) {
    super("Missing param: " + paramName);
    this.name = "MissingParamError";
  }
}
