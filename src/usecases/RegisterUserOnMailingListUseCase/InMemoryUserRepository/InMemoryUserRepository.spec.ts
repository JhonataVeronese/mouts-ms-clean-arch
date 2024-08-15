import { UserDataDTO } from "../../../entities/user/UserDataDTO";
import { InMemoryUserRepository } from "./InMemoryUserRepository";

describe("In memory User repository", () => {
  test("should return user if user is found", async () => {
    const users: UserDataDTO[] = [
      { name: "any_name", email: "any_email@mail.com" },
    ];
    const userRepo = new InMemoryUserRepository(users);
    const user = await userRepo.findUserByEmail("any_email@mail.com");
    expect(user.name).toEqual("any_name");
  });

  test("should return null if user is not found", async () => {
    const users: UserDataDTO[] = [];
    const userRepo = new InMemoryUserRepository(users);
    const user = await userRepo.findUserByEmail("any_email@mail.com");
    expect(user).toEqual(null);
  });

  test("should add user", async () => {
    const users: UserDataDTO[] = [];
    const userRepo = new InMemoryUserRepository(users);
    await userRepo.add({ name: "any_name", email: "any_email@mail.com" });
    const user = await userRepo.findUserByEmail("any_email@mail.com");
    expect(user.email).toEqual("any_email@mail.com");
  });
});
