import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IEmployee } from "../employee/employee.interface";
import { Employee } from "../employee/employee.model";

const getAuthFilter = async (auth: string): Promise<IEmployee> => {
  const result = await Employee.findOne({ _id: auth });

  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden employee.");
  }
  return result;
};

export const getAuthServices = {
  getAuthFilter,
};
