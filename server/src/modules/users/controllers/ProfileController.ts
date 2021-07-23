import { Request, Response } from "express";

import { ShowProfileService } from "../services/ShowProfileService";

class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = new ShowProfileService();

    const profile = await showProfile.execute(user_id);

    return response.json(profile);
  }
}

export { ProfileController };
