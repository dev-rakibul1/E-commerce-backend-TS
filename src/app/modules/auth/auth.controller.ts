import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config/config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./auth.services";

const loginEmployee = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authService.loginUserService(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfully!",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);
  console.log("cookies___auth controller:", req.cookies.authorization);

  const result = await authService.refreshTokenService(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token generate success!",
    data: result,
  });
});

export const loginController = {
  loginEmployee,
  refreshToken,
};
