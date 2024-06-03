"use server";

import prisma from "@/lib/db";
import { parseStringify } from "@/lib/utils";

export const getUser = async (id: string | undefined) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    return user;
  } catch (e) {
    console.error("error while getting user", e);
  }
};

export const getBanks = async (userId: string | undefined) => {
  try {
    const banks = await prisma.bank.findMany({
      where: {
        userId,
      },
    });

    return parseStringify(banks);
  } catch (e) {
    console.error("Error getting banks", e);
  }
};

export const getBank = async (bankId: string) => {
  try {
    const bank = await prisma.bank.findUnique({
      where: {
        id: bankId,
      },
    });

    // return bank;
    return parseStringify(bank);
  } catch (e) {
    console.error("Error getting the bank info", e);
  }
};

export const getBankByAccountId = async ({
  accountId,
}: getBankByAccountIdProps) => {
  try {
    const bank = await prisma.bank.findFirst({
      where: {
        accountId,
      },
    });

    if (!bank) {
      return null;
    }

    return parseStringify(bank);
  } catch (e) {
    console.error("Error while getting bank by account id", e);
  }
};
