import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { employeeFiltering } from "./employee.contant";
import { IEmployee, employeePertialSearch } from "./employee.interface";
import { Employee } from "./employee.model";
const randomSeed = Math.floor(Math.random() * 1000);
const imageUrl = `https://picsum.photos/seed/${randomSeed}/200/300`;

const createEmployeeServices = async (
  payload: IEmployee
): Promise<IEmployee> => {
  if (!payload.role) {
    payload.role = "employee";
  }

  if (!payload.profilePicture) {
    payload.profilePicture = imageUrl;
  }

  const aAdministrator = payload.role;

  if (aAdministrator && aAdministrator === "administrator") {
    const isAdministrator = await Employee.findOne({ role: aAdministrator });

    if (isAdministrator) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Already have an administrator."
      );
    }
  }

  const result = await Employee.create(payload);
  return result;
};

const getAllEmployeeServices = async (
  filters: employeePertialSearch,
  pOption: IPaginationOptions
): Promise<IGenericResponse<IEmployee[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pOption);
  const andCondition = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andCondition.push({
      $or: employeeFiltering.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const defaultEmployee = "employee";
  const whereConditions =
    andCondition.length > 0
      ? { $and: andCondition }
      : { role: defaultEmployee };

  const result = await Employee.find(whereConditions)
    .populate("shift")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Employee.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAllSupervisorServices = async (
  filters: employeePertialSearch,
  pOption: IPaginationOptions
): Promise<IGenericResponse<IEmployee[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pOption);
  const andCondition = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andCondition.push({
      $or: employeeFiltering.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const defaultEmployee = "supervisor";
  const whereConditions =
    andCondition.length > 0
      ? { $and: andCondition }
      : { role: defaultEmployee };

  const result = await Employee.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Employee.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get single employee
const getSingleEmployeeServices = async (id: string): Promise<IEmployee> => {
  const result = await Employee.findById(id).populate("shift");

  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid id.");
  }
  return result;
};

// Update employee
const updateEmployeeServices = async (
  id: string,
  payload: Partial<IEmployee>
): Promise<IEmployee | null> => {
  const isIdExist = await Employee.findById(id);

  if (!isIdExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid employee Id.");
  }

  const aAdministrator = payload.role;

  if (aAdministrator && aAdministrator === "administrator") {
    const isAdministrator = await Employee.findOne({ role: aAdministrator });

    if (isAdministrator) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Already have an administrator."
      );
    }
  }

  const result = await Employee.findByIdAndUpdate(id, payload, {
    new: true,
  }).lean();

  return result;
};

// Delete employee
const deleteEmployeeServices = async (
  id: string
): Promise<IEmployee | null> => {
  const isIdExist = await Employee.findById(id);

  if (!isIdExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid employee Id.");
  }

  const result = await Employee.findByIdAndDelete(id, {
    new: true,
  }).lean();

  return result;
};

export const employeeServices = {
  createEmployeeServices,
  getAllEmployeeServices,
  getSingleEmployeeServices,
  updateEmployeeServices,
  deleteEmployeeServices,
  getAllSupervisorServices,
};
