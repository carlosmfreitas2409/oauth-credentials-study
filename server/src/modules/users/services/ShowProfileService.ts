import { getRepository } from "typeorm";
import { classToClass } from "class-transformer";

import { User } from "../entities/User";
import { AppError } from "../../../errors/AppError";

class ShowProfileService {
  private usersRepository = getRepository(User);

  async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findOne(user_id);

    if(!user) {
      throw new AppError('User does not exists!', 404);
    }

    return classToClass(user);
  }
}

export { ShowProfileService };
