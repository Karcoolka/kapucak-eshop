export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Kapucak Eshop";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern ecommerce store built with Next.js and Tailwind CSS";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "admin@example.com",
  password: "123456",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  country: "",
};

export const DEFAULT_PAYMENT_METHODS = [
  'PayPal',
  'Stripe',
  'CashOnDelivery',
];

function parsePaymentMethods(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"];?$/g, '').trim())
    .filter(Boolean);
}

const fromEnv = process.env.PAYMENT_METHODS
  ? parsePaymentMethods(process.env.PAYMENT_METHODS)
  : [];

export const PAYMENT_METHODS =
  fromEnv.length > 0 ? fromEnv : [...DEFAULT_PAYMENT_METHODS];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';

  export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 2;