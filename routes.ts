/**
 * An array of routes that are accessible to the authenticated users
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  "/",
  "/my-banks",
  "/transaction-history",
  "/payment-transfer",
];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = ["/sign-up", "/sign-in"];
