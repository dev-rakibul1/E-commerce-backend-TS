import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { productController } from "./products.controller";
import { productZodValidation } from "./products.validation";

const router = express.Router();

router.post(
  "/create-product",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.SELLER),
  validateRequest(productZodValidation.createProductZodValidation),
  productController.createProductController
);
router.get("/", productController.getAllProductController);
router.get("/top-seller", productController.getTopSellerController);
router.get("/:id", productController.getSingleProductController);

export const productsRoutes = router;
