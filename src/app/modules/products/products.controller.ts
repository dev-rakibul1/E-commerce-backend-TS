import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IProducts } from "./products.interface";
import { productServices } from "./products.services";

// Create product
const createProductController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await productServices.createProductsServices(payload);

    sendResponse<IProducts>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product created success!",
      data: result,
    });
  }
);
// get product
const getAllProductController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await productServices.getAllProductsServices();

    sendResponse<IProducts[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product get success!",
      data: result,
    });
  }
);

// get product
const getSingleProductController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await productServices.getSingleProductsServices(id);

    sendResponse<IProducts>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single product get success!",
      data: result,
    });
  }
);
// Top seller
const getTopSellerController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await productServices.getTopSellerProductsServices();

    sendResponse<IProducts[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get top seller product!",
      data: result,
    });
  }
);

export const productController = {
  createProductController,
  getAllProductController,
  getSingleProductController,
  getTopSellerController,
};
