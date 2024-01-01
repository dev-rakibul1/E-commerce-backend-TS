import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IEmployee } from "../employee/employee.interface";
import { getAuthServices } from "./getAuth.services";

// get auth
const getAuth = catchAsync(async (req: Request, res: Response) => {
  const auth = "658fc4ada857bad875bb3ed4";

  const token = req.headers.authorization
    ? req.headers.authorization
    : undefined;

  const result = await getAuthServices.getAuthFilter(token);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Auth get success!",
    data: result,
  });
});

export const getAuthController = {
  getAuth,
};
