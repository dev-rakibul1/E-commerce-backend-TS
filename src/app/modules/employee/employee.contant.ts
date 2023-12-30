import { roleTypes } from "./employee.interface";

export const userRole: roleTypes[] = [
  "administrator",
  "supervisor",
  "employee",
];

export const employeeFilterableKeys = [
  "searchTerm",
  "firstName",
  "middleName",
  "lastName",
  "gender",
  "email",
  "phone",
  "address",
];

export const employeeFiltering = [
  "firstName",
  "middleName",
  "lastName",
  "email",
  "gender",
  "phone",
  "address",
];
