import { UserDataDTO } from "../../../entities/User/UserDataDTO";
import { MongoHelper } from "./helpers/mongo-helper";
import { IUserRepository } from "../../../usecases/interface/IUserRepository";

export class MongodbUserRepository implements IUserRepository {
  async findAllUsers(): Promise<UserDataDTO[]> {
    return await MongoHelper.getCollection("users").find().toArray();
  }

  async findUserByEmail(email: string): Promise<UserDataDTO> {
    const userCollection = MongoHelper.getCollection("users");
    const result = await userCollection.findOne({ email: email });
    return result;
  }

  async add(user: UserDataDTO): Promise<void> {
    const userCollection = MongoHelper.getCollection("users");
    const exists = await this.exists(user.email);
    if (!exists) {
      await userCollection.insertOne(user);
    }
  }

  async exists(email: string): Promise<boolean> {
    const result = await this.findUserByEmail(email);
    if (result != null) {
      if (result.email === email) {
        return true;
      }
    }
    return false;
  }
}
