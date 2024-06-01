"use server";

/**
 * https://github.com/Dwolla/integration-examples/tree/main/packages/secure-token-exchange/plaid/src/integrations
 *
 * https://developers.dwolla.com/docs/balance/create-funding-source-plaid#create-a-funding-source
 */

import { equalsIgnoreCase } from "@/lib/utils";
import { Client } from "dwolla-v2";

export interface CreateExchangeOptions {
  customerId: string;
  exchangePartnerHref: string;
  token: string;
}

export interface CreateFundingSourceOptions {
  customerId: string;
  plaidToken: string;
  name: string;
  type: "checking" | "savings";
}

export interface CreateUnverifiedCustomerOptions {
  firstName: string;
  lastName: string;
  email: string;
}

const client = new Client({
  environment: process.env.DWOLLA_ENV!.toLowerCase() as
    | "production"
    | "sandbox",
  key: process.env.DWOLLA_KEY!,
  secret: process.env.DWOLLA_SECRET!,
});

/**
 * Creates a customer exchange resource using the token that was retrieved from Plaid.
 */
export async function createExchange({
  customerId,
  exchangePartnerHref,
  token,
}: CreateExchangeOptions): Promise<string> {
  const response = await client.post(`/customers/${customerId}/exchanges`, {
    _links: {
      "exchange-partner": {
        href: exchangePartnerHref,
      },
    },
    token,
  });
  return response.headers.get("Location")!;
}

/**
 * Creates a funding source for a customer using an exchange URL.
 */
export async function createFundingSource({
  customerId,
  name,
  type,
  plaidToken,
}: CreateFundingSourceOptions): Promise<string> {
  const response = await client.post(
    `/customers/${customerId}/funding-sources`,
    {
      bankAccountType: type,
      name,
      plaidToken,
    },
  );
  return response.headers.get("Location")!;
}

/**
 * Creates an unverified customer record.
 */
export async function createUnverifiedCustomer(
  options: CreateUnverifiedCustomerOptions,
): Promise<string> {
  const response = await client.post("customers", { ...options });
  return response.headers.get("Location")!;
}

/**
 * Gets Plaid's exchange partner href (link) within Dwolla's systems.
 */
export async function getExchangeHref(): Promise<string> {
  const response = await client.get("/exchange-partners");
  const partnersList = response.body._embedded["exchange-partners"];
  const plaidPartner = partnersList.filter((obj: { name: string }) =>
    equalsIgnoreCase(obj.name, "PLAID"),
  )[0];
  return plaidPartner._links.self.href;
}
