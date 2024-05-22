import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." }),
  address1: z.string().min(2),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  // dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, {
  //   message: "Date of birth must be in DD-MM-YYYY format.",
  // }),
  dateOfBirth: z.string().date("Date of birth must be in YYYY-MM-DD format."),
  aadhar: z
    .string()
    .regex(/^\d{12}$/, { message: "Aadhar must be 12 digits." }),

  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
