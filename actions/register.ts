"use server";

import { createUnverifiedCustomer } from "@/actions/dwolla";
import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { extractCustomerIdFromUrl } from "@/lib/utils";
import { signUpSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export const register = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const {
    firstName,
    lastName,
    address1,
    city,
    state,
    aadhar,
    postalCode,
    dateOfBirth,
    email,
    password,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    const dwollaCustomerUrl = await createUnverifiedCustomer({
      firstName,
      lastName,
      email,
    });

    if (!dwollaCustomerUrl) {
      throw new Error("Error creating dwolla customer");
    }

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        address1,
        dwollaCustomerId,
        dwollaCustomerUrl,
        city,
        state,
        aadhar,
        postalCode,
        dateOfBirth,
        email,
        password: hashedPassword,
      },
    });

    return { user: user };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    console.error("Registeration error", error);
  }
};
