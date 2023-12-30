import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IEmployee } from "../employee/employee.interface";
import { IShift } from "./shift.interface";
import { shifteeServices } from "./shift.service";

// Create shift
const createShiftController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await shifteeServices.createShiftServices(payload);

    console.log("Payload from shift create", payload);

    sendResponse<IEmployee>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Shift created success!",
      data: result,
    });
  }
);

// Get all shift
const getAllShiftController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ["searchTerm"]);
    const pOptions = pick(req.query, paginationFields);

    const result = await shifteeServices.getAllShiftServices(filters, pOptions);

    sendResponse<IShift[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Shift get success!",
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single shift
const getSingleShiftController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await shifteeServices.getSingleShiftServices(id);

    sendResponse<IShift>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single shift get success!",
      data: result,
    });
  }
);

// Filter by employee
const filterByEmployeeShiftController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await shifteeServices.filterByEmployeeServices(id);

    sendResponse<IShift>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Filter by employee and shift get success!",
      data: result,
    });
  }
);
// Get single shift
const updateShiftController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await shifteeServices.updateShiftServices(id, payload);

    sendResponse<IShift>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Shift updated success!",
      data: result,
    });
  }
);

// Get single shift
const deleteShiftController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await shifteeServices.deleteShiftServices(id);

    sendResponse<IShift>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Shift updated success!",
      data: result,
    });
  }
);

export const shiftController = {
  createShiftController,
  getAllShiftController,
  getSingleShiftController,
  updateShiftController,
  deleteShiftController,
  filterByEmployeeShiftController,
};
