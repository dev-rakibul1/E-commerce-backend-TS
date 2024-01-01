import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { SortOrder } from "mongoose";
import config from "../../../config/config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { employeeFiltering } from "./employee.contant";
import {
  ICrateEmployeeWithToken,
  IEmployee,
  employeePertialSearch,
} from "./employee.interface";
import { Employee } from "./employee.model";
const randomSeed = Math.floor(Math.random() * 1000);
const imageUrl = `https://picsum.photos/seed/${randomSeed}/200/300`;

const createEmployeeServices = async (
  payload: IEmployee
): Promise<ICrateEmployeeWithToken> => {
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

  // Create access token
  const accessToken = jwtHelpers.createToken(
    {
      email: payload?.email,
      role: payload?.role,
    },
    config.jwtAccessKey as Secret,
    config.jwtAccessExpireDate as string
  );

  // Create refresh token
  jwtHelpers.createToken(
    { email: payload?.email, role: payload?.role },
    config.jwtRefreshKey as Secret,
    config.jwtRefreshExpireDate as string
  );

  const result = await Employee.create(payload);
  return {
    accessToken,
    data: result,
  };
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
const getAllAdministratorServices = async (
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

  const defaultEmployee = "administrator";
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

  if (isIdExist.role === "administrator") {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not authorized for delete administrator"
    );
  }

  const result = await Employee.findByIdAndDelete(id, {
    new: true,
  }).lean();

  return result;
};

// Password change
const passwordChangeService = async (
  id: string,
  payload: Partial<IEmployee>
): Promise<IEmployee | null> => {
  const isExist = await Employee.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found!");
  }
  const isCurrentPassword = payload.password;

  if (!isCurrentPassword) {
    throw new ApiError(httpStatus.NOT_EXTENDED, "Password does not exist!");
  }

  const dbPass = await Employee.findById(id, { password: 1 }).lean();

  if (!dbPass) {
    throw new ApiError(httpStatus.NOT_EXTENDED, "Password does not exist!");
  }

  // password verify
  const isPasswordMatch = await bcrypt.compare(
    isCurrentPassword,
    dbPass?.password
  );

  if (!isPasswordMatch) {
    throw new Error("Current password does not match!");
  }

  const isNewPassword = payload.newPassword;
  if (!isNewPassword) {
    throw new Error("New password does not exist!");
  }

  // Hash the new password before updating
  const hashedPassword = await bcrypt.hash(
    isNewPassword,
    Number(config.bcrypt_salts_round)
  );

  const updatePassword = await Employee.findByIdAndUpdate(
    id,
    { password: hashedPassword, newPassword: "" },
    { new: true }
  );
  return updatePassword;
};

export const employeeServices = {
  createEmployeeServices,
  getAllEmployeeServices,
  getSingleEmployeeServices,
  updateEmployeeServices,
  deleteEmployeeServices,
  getAllSupervisorServices,
  passwordChangeService,
  getAllAdministratorServices,
};
