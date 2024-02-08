import { z } from "zod";

export const createProductZodValidation = z.object({
  body: z.object({
    brand: z.string().min(1, { message: "Brand is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    price: z.string().min(0.01, { message: "Price must be greater than 0" }),
    currency: z.string().min(1, { message: "Currency is required" }),
    movement: z.string().min(1, { message: "Movement is required" }),
    case_material: z.string().min(1, { message: "Case material is required" }),
    case_diameter: z
      .string()
      .min(1, { message: "Case diameter must be greater than 0" }),
    case_thickness: z
      .string()
      .min(1, { message: "Case thickness is required" }),
    strap_material: z
      .string()
      .min(1, { message: "Strap material is required" }),
    strap_width: z
      .string()
      .min(1, { message: "Strap width must be greater than 0" }),
    water_resistance: z
      .string()
      .min(1, { message: "Water resistance is required" }),
    functions: z
      .array(z.string())
      .min(1, { message: "At least one function is required" }),
    features: z
      .array(z.string())
      .min(1, { message: "At least one feature is required" }),
    color_options: z
      .array(z.string())
      .min(1, { message: "At least one color option is required" }),
    availability: z.boolean(),
    ratings: z.object({}).optional(), // Define a more specific schema for ratings object if necessary
    description: z.string().min(1, { message: "Description is required" }),
    user: z.string({ required_error: "User id is required!" }),
    image_url: z.string().optional(),
    quantity: z.string().optional(),
  }),
});

export const productZodValidation = {
  createProductZodValidation,
};
