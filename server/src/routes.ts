import { Router } from "express";

import { SessionsController } from "./modules/users/controllers/SessionsController";
import { UsersController } from "./modules/users/controllers/UsersController";
import { OAuthController } from "./modules/users/controllers/OAuthController";
import { ensureAuthenticated } from "./modules/users/middlewares/ensureAuthenticated";
import { ShowProfileService } from "./modules/users/services/ShowProfileService";
import { ProfileController } from "./modules/users/controllers/ProfileController";

const router = Router();

const usersController = new UsersController();
const sessionsController = new SessionsController();
const oauthController = new OAuthController();
const profileController = new ProfileController();

router.post('/users', usersController.create);

router.post('/sessions', sessionsController.create);
router.post('/oauth/github/:code', oauthController.github);

router.get('/profile/me', ensureAuthenticated, profileController.show);

export { router as routes };
