import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { UserZodValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserZodValidation.createUserZodValidation),
  userController.createUserController
);
router.get("/", userController.getUserController);
router.get("/:id", userController.getSingleUserController);
router.patch("/:id", userController.updateUserController);

export const userRoutes = router;
