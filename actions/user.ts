"use server";

import prisma from "@/lib/db";

export const getUser = async (id: string | undefined) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        dwollaCustomerUrl: true,
        dwollaCustomerId: true,
        firstName: true,
        lastName: true,
        address1: true,
        city: true,
        state: true,
        aadhar: true,
        postalCode: true,
        dateOfBirth: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        sessions: true,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
  }
};
