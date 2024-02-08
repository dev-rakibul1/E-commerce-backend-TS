import { Schema, model } from "mongoose";
import { IProducts, ProductModels } from "./products.interface";

const productSchema = new Schema<IProducts, ProductModels>(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    movement: {
      type: String,
      required: true,
      trim: true,
    },
    case_material: {
      type: String,
      required: true,
      trim: true,
    },
    case_diameter: {
      type: String,
      required: true,
      trim: true,
    },
    case_thickness: {
      type: String,
      required: true,
      trim: true,
    },
    strap_width: {
      type: String,
      required: true,
      trim: true,
    },
    strap_material: {
      type: String,
      required: true,
      trim: true,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    water_resistance: {
      type: String,
      required: true,
      trim: true,
    },
    functions: {
      type: [String],
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      required: true,
      trim: true,
    },
    color_options: {
      type: [String],
      required: true,
      trim: true,
    },
    availability: {
      type: Boolean,
      required: true,
      trim: true,
    },
    ratings: {
      type: Object,
      trim: true,
    },
    quantity: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Products = model<IProducts, ProductModels>(
  "Products",
  productSchema
);
