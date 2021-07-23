import { Request, Response } from "express";

import { CreateUserService } from "../services/CreateUserService";

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    await createUser.execute({
      name,
      email,
      password
    });

    return response.status(201).send();
  }
}

export { UsersController };
