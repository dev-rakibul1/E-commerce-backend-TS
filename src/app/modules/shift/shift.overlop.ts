import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { Shift } from "./shift.model";

export const validateShiftOverlap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, startTime, endTime, employee } = req.body;

  const overlappingShifts = await Shift.find({
    employee,
    date,
    $or: [
      {
        $and: [
          { startTime: { $lt: endTime } },
          { endTime: { $gt: startTime } },
        ],
      },
      {
        $and: [
          { startTime: { $gte: startTime } },
          { endTime: { $lte: endTime } },
        ],
      },
    ],
  });

  if (overlappingShifts.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message:
        "Overlapping shifts are not allowed for the same employee on the same day.",
    });
  }

  next();
};
