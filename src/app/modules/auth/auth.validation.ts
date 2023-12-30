import { z } from "zod";

const createLoginAuthValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required.",
      })
      .nonempty("Email is required."),
    password: z
      .string({
        required_error: "Password is required.",
      })
      .nonempty("Password you not provide empty value.")
      .min(8, "Password must be at least 8 characters long."),
  }),
});

const createRefreshTokenZodValidation = z.object({
  cookies: z.object({
    refreshToken: z
      .string({
        required_error: "Refresh token is required.",
      })
      .nonempty("Please provide a refresh token."),
  }),
});

export const authValidation = {
  createLoginAuthValidation,
  createRefreshTokenZodValidation,
};
