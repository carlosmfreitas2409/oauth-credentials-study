import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { classToClass } from "class-transformer";

import { getUserAccessToken, getUserDetails } from "../../../utils/githubOAuth";
import { User } from "../entities/User";
import { AppError } from "../../../errors/AppError";

interface IResponse {
  user: User;
  token: string;
}

class CreateGithubUserService {
  private usersRepository = getRepository(User);

  async execute(code: string): Promise<any> {
    const access_token = await getUserAccessToken(code);
    const githubUser = await getUserDetails(access_token);

    const { name, email, avatar_url } = githubUser;

    const userExists = await this.usersRepository.findOne({ email });

    if(userExists) {
      if(userExists.provider !== 'github') throw new AppError('No user registered with Github!', 404);

      const token = sign({}, process.env.TOKEN_SECRET, {
        subject: userExists.id
      });

      return { user: userExists, token };
    }

    const user = this.usersRepository.create({
      name,
      email,
      avatar: avatar_url,
      provider: 'github',
    });

    await this.usersRepository.save(user);

    const token = sign({}, process.env.TOKEN_SECRET, {
      subject: user.id
    });

    return { user: classToClass(user), token };
  }
}

export { CreateGithubUserService };
