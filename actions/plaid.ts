"use server";

import { createFundingSource } from "@/actions/dwolla";
import prisma from "@/lib/db";
import { plaidClient } from "@/lib/plaid.config";
import { encryptId, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user?.id as string,
      },
      client_name: `${user?.firstName} ${user?.lastName}`,
      products: [Products.Auth],
      language: "en",
      country_codes: [CountryCode.Us],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token });
  } catch (e) {
    console.error("create link token error");
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await createFundingSource({
      customerId: user?.dwollaCustomerId!,
      plaidToken: processorToken,
      name: accountData.name,
      type: "checking",
    });

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
    await createBankAccount({
      userId: user?.id!,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (e) {
    console.error("exchange public token error");
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    await prisma.bank.create({
      data: {
        id: bankId,
        userId,
        accessToken,
        accountId,
        fundingSourceUrl,
        shareableId,
      },
    });
  } catch (e) {
    console.error("Error occoured while creating a bank account", e);
  }
};
