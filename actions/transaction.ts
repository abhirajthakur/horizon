"use server";

import prisma from "@/lib/db";
import { parseStringify } from "@/lib/utils";

export const createTransaction = async (
  transaction: CreateTransactionProps,
) => {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        channel: "Transfer",
        category: "online",
        email: transaction.email,
        name: transaction.name,
        amount: transaction.amount,
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
        senderBankId: transaction.senderBankId,
        receiverBankId: transaction.receiverBankId,
      },
    });

    return parseStringify(newTransaction);
  } catch (e) {
    console.error("error while creating a transaction", e);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: {
  bankId: string;
}) => {
  try {
    const senderTransactions = await prisma.transaction.findMany({
      where: {
        senderBankId: bankId,
      },
    });

    const receiverTransactions = await prisma.transaction.findMany({
      where: {
        receiverBankId: bankId,
      },
    });

    const transactions = {
      total: senderTransactions.length + receiverTransactions.length,
      transactions: [...senderTransactions, ...receiverTransactions],
    };

    return parseStringify(transactions);
  } catch (e) {
    console.error("error while creating a transaction", e);
  }
};
