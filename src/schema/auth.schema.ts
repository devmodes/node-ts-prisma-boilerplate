import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email("Email should be a valid email"),
  password: z.string().min(8, "Password should be atleast 8 characters long"),
});

export const SigninSchema = z.object({
  email: z.string().email("Email should be a valid email"),
  password: z.string(),
});
