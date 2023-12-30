import { NextFunction } from "connect";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import applicationRoutes from "./app/applicationRoutes/app.routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import databaseConnect from "./utility/server";
const app: Application = express();

// middle were calling
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API connect
app.use("/api/v1/", applicationRoutes);

app.use(globalErrorHandler);
// global error handling
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not fount.",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API not found!",
      },
    ],
  });
  next();
});

// calling database
databaseConnect();

export default app;
