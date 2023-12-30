import { Model, Schema, Types } from "mongoose";
import { IShift } from "../shift/shift.interface";

export type roleTypes = "administrator" | "supervisor" | "employee";
export type employeePertialSearch = {
  searchTerm?: string;
};

export type IEmployee = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  role?: roleTypes;
  password: string;
  profilePicture?: string;
  shift?: Types.Array<Schema.Types.ObjectId | IShift>;
};

export type IEmployeeMethods = {
  isEmailExist(email: string): Promise<Partial<IEmployee> | null>;
  isPasswordMatch(
    currentPassword: string,
    savePassword: string
  ): Promise<boolean>;
};

export type EmoloyeeModel = Model<
  IEmployee,
  Record<string, unknown>,
  IEmployeeMethods
>;
