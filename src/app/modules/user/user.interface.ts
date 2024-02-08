import { Model, Schema, Types } from "mongoose";
import { IProducts } from "../products/products.interface";

export type roleTypes = "super_admin" | "seller" | "customer";
export type userPartialSearch = {
  searchTerm?: string;
};

export type IUser = {
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
  products?: Types.Array<Schema.Types.ObjectId | IProducts>;
  newPassword?: string;
  cart?: [];
};

export type IUserMethods = {
  isEmailExist(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatch(
    currentPassword: string,
    savePassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type ICrateUserWithToken = {
  accessToken: string;
  data: object;
};
