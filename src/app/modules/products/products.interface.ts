import { Model, Schema, Types } from "mongoose";

export type IProducts = {
  brand: string;
  model: string;
  price: string;
  currency: string;
  movement: string;
  user: Types.Array<Schema.Types.ObjectId | IProducts>;
  case_material: string;
  case_diameter: string;
  case_thickness: string;
  strap_material: string;
  strap_width: string;
  water_resistance: string;
  functions: [string];
  features: [string];
  color_options: [string];
  availability: boolean;
  ratings?: object;
  description: string;
  image_url?: string;
  quantity?: string;
};

export type ProductModels = Model<IProducts, Record<string, unknown>>;
