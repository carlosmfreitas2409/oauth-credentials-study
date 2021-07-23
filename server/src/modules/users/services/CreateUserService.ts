import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import { classToClass } from "class-transformer";

import { User } from "../entities/User";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository = getRepository(User);

  async execute({
    name,
    email,
    password
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if(userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      provider: 'credentials'
    });

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export { CreateUserService };
