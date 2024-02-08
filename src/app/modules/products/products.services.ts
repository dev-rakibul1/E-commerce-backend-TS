import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { IProducts } from "./products.interface";
import { Products } from "./products.model";

const createProductsServices = async (
  payload: IProducts
): Promise<IProducts> => {
  const userId = payload.user;

  if (!userId) {
    throw new ApiError(httpStatus.FORBIDDEN, "User is not valid!");
  }

  const product = await Products.create(payload);
  const productId = product._id;

  // const user = await User.findById(userId);

  // const userProductArray = user?.products?.push(productId)
  await User.findByIdAndUpdate(userId, {
    $push: { products: productId },
  });

  return product;
};

const getAllProductsServices = async (): Promise<IProducts[] | null> => {
  const result = await Products.find().populate("user");
  return result;
};

const getSingleProductsServices = async (
  id: string
): Promise<IProducts | null> => {
  const result = await Products.findById(id);
  return result;
};

const getTopSellerProductsServices = async (): Promise<IProducts[] | null> => {
  const result = await Products.aggregate([
    {
      $match: {
        "ratings.average": { $gte: 4.6 },
      },
    },
    {
      $limit: 4,
    },
  ]);

  return result;
};

export const productServices = {
  createProductsServices,
  getAllProductsServices,
  getSingleProductsServices,
  getTopSellerProductsServices,
};
