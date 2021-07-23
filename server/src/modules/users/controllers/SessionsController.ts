import { Request, Response } from "express";

import { AuthenticateUserService } from "../services/AuthenticateUserService";

class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const session = await authenticateUser.execute({
      email,
      password
    });

    return response.json(session);
  }
}

export { SessionsController };
