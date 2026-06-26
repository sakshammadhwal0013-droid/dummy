export const CURRENCIES = {
  INR: { code: "INR", symbol: "₹", rate: 1 },
  USD: { code: "USD", symbol: "$", rate: 0.012 },
  EUR: { code: "EUR", symbol: "€", rate: 0.011 },
  GBP: { code: "GBP", symbol: "£", rate: 0.0095 },
  AUD: { code: "AUD", symbol: "A$", rate: 0.018 },
  JPY: { code: "JPY", symbol: "¥", rate: 1.8 },
  CAD: { code: "CAD", symbol: "C$", rate: 0.016 },
  AED: { code: "AED", symbol: "د.إ", rate: 0.044 },
};

export function formatPrice(priceInINR: number, targetCurrency: string = "INR") {
  const currencyInfo = CURRENCIES[targetCurrency as keyof typeof CURRENCIES] || CURRENCIES.INR;
  const converted = priceInINR * currencyInfo.rate;
  
  // Format based on currency type (no decimals for JPY, INR, standard 2 for others)
  const isNoDecimal = ["INR", "JPY"].includes(currencyInfo.code);
  const formattedAmount = converted.toLocaleString(undefined, {
    minimumFractionDigits: isNoDecimal ? 0 : 0,
    maximumFractionDigits: isNoDecimal ? 0 : 2,
  });

  return `${currencyInfo.symbol}${formattedAmount}`;
}

export function parsePriceString(priceStr: string): number {
  // Extract numbers from something like "₹18,500" or "$300"
  const cleaned = priceStr.replace(/[^0-9.-]+/g, "");
  return parseFloat(cleaned) || 0;
}
