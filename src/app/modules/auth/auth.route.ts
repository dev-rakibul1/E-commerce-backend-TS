import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { loginController } from "./auth.controller";
import { authValidation } from "./auth.validation";
const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.createLoginAuthValidation),
  loginController.loginEmployee
);

router.post(
  "/create-refresh-token",
  validateRequest(authValidation.createRefreshTokenZodValidation),
  loginController.refreshToken
);

export const authRoutes = router;
