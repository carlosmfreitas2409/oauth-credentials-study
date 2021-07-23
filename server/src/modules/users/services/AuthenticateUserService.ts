import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { classToClass } from "class-transformer";

import { User } from "../entities/User";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private usersRepository = getRepository(User);

  async execute({
    email,
    password
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findOne({ email });

    if(!user) {
      throw new AppError('Email/password incorrect!', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError('Email/password incorrect!', 401);
    }

    const token = sign({}, process.env.TOKEN_SECRET, {
      subject: user.id
    });

    return { user: classToClass(user), token };
  }
}

export { AuthenticateUserService };
