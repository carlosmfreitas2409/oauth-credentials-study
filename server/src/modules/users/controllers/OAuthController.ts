import { Request, Response } from "express";

import { CreateGithubUserService } from "../services/CreateGithubUserService";

class OAuthController {
  async github(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const createUser = new CreateGithubUserService();

    const session = await createUser.execute(code);

    return response.json(session);
  }
}

export { OAuthController };
