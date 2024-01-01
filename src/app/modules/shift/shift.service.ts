import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IEmployee } from "../employee/employee.interface";
import { Employee } from "../employee/employee.model";
import { IShift, shiftPartialSearch } from "./shift.interface";
import { Shift } from "./shift.model";

const createShiftServices = async (
  payload: IShift
): Promise<IEmployee | null> => {
  // Extract employee ID from the payload
  const employeeId = payload.employee;

  // Check if there is an existing shift for the employee
  const existingShift = await Shift.findOne({ employee: employeeId });

  if (existingShift) {
    // If a shift already exists, return a message or throw an error
    throw new Error("Shift already exists for this employee");
  }

  // If no existing shift, create a new shift
  const createdShift = await Shift.create(payload);

  // Update the employee with the new shift ID
  const updateShift = await Employee.findByIdAndUpdate(employeeId, {
    $push: { shift: createdShift._id },
  }).populate("shift");

  return updateShift;
};

const getAllShiftServices = async (
  filters: shiftPartialSearch,
  pOptions: IPaginationOptions
): Promise<IGenericResponse<IShift[]>> => {
  const { searchTerm } = filters;

  const andCondition = [];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pOptions);

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andCondition.push({
      $or: ["date", "startData", "endDate"].map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Shift.find(whereConditions)
    .populate("employee")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Shift.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleShiftServices = async (id: string): Promise<IShift> => {
  const result = await Shift.findById(id).populate("employee");

  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid id.");
  }
  return result;
};

const filterByEmployeeServices = async (id: string): Promise<IShift | null> => {
  const result = await Shift.findOne({ employee: id });

  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, "Shift not available.");
  }
  return result;
};

const updateShiftServices = async (
  id: string,
  payload: Partial<IShift>
): Promise<IShift | null> => {
  const isIdExist = await Shift.findById(id);

  if (!isIdExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid id.");
  }

  const result = await Shift.findByIdAndUpdate(id, payload, {
    new: true,
  })
    .lean()
    .populate("employee");

  return result;
};

const deleteShiftServices = async (id: string): Promise<IShift | null> => {
  const isIdExist = await Shift.findById(id);
  if (!isIdExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid id.");
  }

  const result = await Shift.findByIdAndDelete(id, {
    new: true,
  }).lean();

  return result;
};

export const shifteeServices = {
  createShiftServices,
  getAllShiftServices,
  getSingleShiftServices,
  updateShiftServices,
  deleteShiftServices,
  filterByEmployeeServices,
};
