import { IHttpResponse } from "../interface/http";
import { ServerError } from "../errors/ServerError";

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error.message,
});

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (reason: string): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason),
});

export function notFound(error: Error): IHttpResponse {
  return {
    statusCode: 404,
    body: error.message,
  };
}
