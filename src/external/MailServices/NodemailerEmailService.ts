import * as nodemailer from "nodemailer";
import { Either, left, right } from "../../shared/either";
import { MailServiceError } from "../../usecases/errors/MailServiceError";
import {
  IEmailOptions,
  IEmailService,
} from "../../usecases/interface/IEmailService";

export class NodemailerEmailService implements IEmailService {
  async send(
    options: IEmailOptions
  ): Promise<Either<MailServiceError, IEmailOptions>> {
    try {
      const transporter = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        auth: {
          user: options.username,
          pass: options.password,
        },
      });
      await transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      });
    } catch (error) {
      return left(new MailServiceError());
    }
    return right(options);
  }
}
