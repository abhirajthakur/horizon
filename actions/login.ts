"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { signInSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import z from "zod";

export const login = async (
  values: z.infer<typeof signInSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  // if there is no existing user or user is not registered with credentials instead user is registered with OAuth
  if (!existingUser || !existingUser.email) {
    return { error: "User not registered!" };
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isCorrectPassword) {
    return { error: "Invalid credentials!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
