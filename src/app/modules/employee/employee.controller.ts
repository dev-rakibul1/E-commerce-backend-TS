import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { employeeFilterableKeys } from "./employee.contant";
import { IEmployee } from "./employee.interface";
import { employeeServices } from "./employee.services";

// Create employee
const createEmployeeController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await employeeServices.createEmployeeServices(payload);

    sendResponse<IEmployee>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Employee created success!",
      data: result,
    });
  }
);

// get all employee
const getAllEmployeeController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, employeeFilterableKeys);
    const pOption = pick(req.query, paginationFields);

    const result = await employeeServices.getAllEmployeeServices(
      filters,
      pOption
    );

    sendResponse<IEmployee[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Employee get success!",
      meta: result.meta,
      data: result.data,
    });
  }
);

// get all supervisor
const getAllSupervisorController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, employeeFilterableKeys);
    const pOption = pick(req.query, paginationFields);

    const result = await employeeServices.getAllSupervisorServices(
      filters,
      pOption
    );

    sendResponse<IEmployee[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Supervisor get success!",
      meta: result.meta,
      data: result.data,
    });
  }
);

// get single employee
const getSingleEmployeeController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await employeeServices.getSingleEmployeeServices(id);

    sendResponse<IEmployee>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single employee get success!",
      data: result,
    });
  }
);

//Update employee
const updateEmployeeController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    console.log(id, payload);

    const result = await employeeServices.updateEmployeeServices(id, payload);

    sendResponse<IEmployee>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Employee updeted success!",
      data: result,
    });
  }
);

//Delete employee
const deleteEmployeeController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await employeeServices.deleteEmployeeServices(id);

    sendResponse<IEmployee>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Employee deleted success!",
      data: result,
    });
  }
);

export const employeeController = {
  createEmployeeController,
  getAllEmployeeController,
  getSingleEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getAllSupervisorController,
};
