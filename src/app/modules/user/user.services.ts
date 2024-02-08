import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config/config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { ICrateUserWithToken, IUser } from "./user.interface";
import { User } from "./user.model";
const randomSeed = Math.floor(Math.random() * 1000);
const imageUrl = `https://picsum.photos/seed/${randomSeed}/200/300`;

const createUserServices = async (
  payload: IUser
): Promise<ICrateUserWithToken> => {
  if (!payload.role) {
    payload.role = "customer";
  }

  if (!payload.profilePicture) {
    payload.profilePicture = imageUrl;
  }

  const superAdmin = payload.role;

  if (superAdmin && superAdmin === "super_admin") {
    const isAdministrator = await User.findOne({ role: superAdmin });

    if (isAdministrator) {
      throw new ApiError(httpStatus.FORBIDDEN, "Already have an super admin.");
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

  const result = await User.create(payload);
  return {
    accessToken,
    data: result,
  };
};

const getUserServices = async (): Promise<IUser[] | null> => {
  const user = await User.find({}).populate("products");
  return user;
};

const updateUserServices = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(id, payload);
  return user;
};

const getSingleUserServices = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid user");
  }
  return user;
};

export const userServices = {
  createUserServices,
  getUserServices,
  updateUserServices,
  getSingleUserServices,
};
