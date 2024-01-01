import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { IEmployee } from "../employee/employee.interface";
import { Employee } from "../employee/employee.model";

const getAuthFilter = async (token: string | undefined): Promise<IEmployee> => {
  if (!token) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden employee.");
  }

  // Decoding the JWT payload
  const decodedPayload = jwt.decode(token) as JwtPayload;
  // console.log(decodedPayload);

  const email = decodedPayload?.email;

  if (!email) {
    throw new ApiError(httpStatus.FORBIDDEN, "Email not found in JWT payload");
  }

  const employee = await Employee.findOne({ email }).populate("shift");

  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found.");
  }

  return employee;
};

export const getAuthServices = {
  getAuthFilter,
};
