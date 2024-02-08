import { roleTypes } from "./user.interface";

export const userRole: roleTypes[] = ["super_admin", "seller", "customer"];

export const UserFilterableKeys = [
  "searchTerm",
  "firstName",
  "middleName",
  "lastName",
  "gender",
  "email",
  "phone",
  "address",
];

export const UserFiltering = [
  "firstName",
  "middleName",
  "lastName",
  "email",
  "gender",
  "phone",
  "address",
];
