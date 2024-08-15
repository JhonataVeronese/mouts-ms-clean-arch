import { Either } from "../../shared/either";
import { MailServiceError } from "../errors/MailServiceError";

export interface IEmailOptions {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  readonly attachments: Object[];
}

export interface IEmailService {
  send: (
    options: IEmailOptions
  ) => Promise<Either<MailServiceError, IEmailOptions>>;
}
