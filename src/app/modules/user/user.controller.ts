import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ICrateUserWithToken, IUser } from "./user.interface";
import { userServices } from "./user.services";

// Create user
const createUserController = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userServices.createUserServices(payload);

  sendResponse<ICrateUserWithToken>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created success!",
    data: result,
  });
});
// get user
const getUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getUserServices();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User get success!",
    data: result,
  });
});
// get user
const updateUserController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await userServices.updateUserServices(id, payload);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated success!",
    data: result,
  });
});

// get user
const getSingleUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await userServices.getSingleUserServices(id);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated success!",
      data: result,
    });
  }
);

export const userController = {
  createUserController,
  getUserController,
  updateUserController,
  getSingleUserController,
};
