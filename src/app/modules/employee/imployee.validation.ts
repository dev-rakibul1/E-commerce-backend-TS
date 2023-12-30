import { z } from "zod";

const createEmployeeZodValidation = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: "First name is required!" })
      .max(55, "First name max 55 length.")
      .min(3, "First name min 3 length."),

    middleName: z.string().max(55, "Middle name max 55 length.").optional(),
    lastName: z
      .string({ required_error: "Last name is required!" })
      .max(55, "Last name max 55 length.")
      .min(3, "Last name min 3 length."),

    email: z
      .string({ required_error: "Email is required!" })
      .refine(
        (email) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
        {
          message: "Invalid email format!",
        }
      ),
    profilePicture: z.string().optional(),

    gender: z.string({ required_error: "Gender is required!" }),

    phone: z
      .string({ required_error: "Phone is required!" })
      .refine((phone) => /\+?\d{8,15}$/.test(phone), {
        message: "Invalid phone number format!",
      }),

    address: z
      .string({ required_error: "Address is required!" })
      .max(55, "Address max 55 length.")
      .min(3, "Address min 3 length."),

    role: z.string().optional(),

    password: z
      .string({ required_error: "Password is required!" })
      .refine(
        (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password),
        {
          message:
            "Password must be at least 8 characters long and include both letters and numbers.",
        }
      ),
  }),
});

const updateEmployeeZodValidation = z.object({
  body: z.object({
    firstName: z
      .string()
      .max(55, "First name max 55 length.")
      .min(3, "First name min 3 length.")
      .optional(),

    middleName: z.string().max(55, "Middle name max 55 length.").optional(),
    lastName: z
      .string()
      .max(55, "Last name max 55 length.")
      .min(3, "Last name min 3 length.")
      .optional(),

    email: z
      .string()
      .refine(
        (email) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
        {
          message: "Invalid email format!",
        }
      )
      .optional(),

    profilePicture: z.string().optional(),
    gender: z.string().optional(),

    phone: z
      .string()
      .refine((phone) => /\+?\d{8,15}$/.test(phone), {
        message: "Invalid phone number format!",
      })
      .optional(),

    address: z.string().optional(),
    role: z
      .enum(["administrator", "supervisor", "employee"])
      .nullable()
      .optional(),

    password: z
      .string()
      .refine(
        (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password),
        {
          message:
            "Password must be at least 8 characters long and include both letters and numbers.",
        }
      )
      .optional(),
  }),
});

export const employeeZodValidation = {
  createEmployeeZodValidation,
  updateEmployeeZodValidation,
};
