import express from "express";
import { getAuthController } from "./getAuth.controller";

const router = express.Router();

router.get("/", getAuthController.getAuth);

export const getAuthRoutes = router;
