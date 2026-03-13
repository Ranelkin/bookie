export function generateInvoiceNumber(
  format: string,
  incrementor: number,
): string {
  const now = new Date();
  return format
    .replace("{YYYY}", String(now.getFullYear()))
    .replace("{YY}", String(now.getFullYear()).slice(-2))
    .replace("{MM}", String(now.getMonth() + 1).padStart(2, "0"))
    .replace("{COUNT}", String(incrementor).padStart(4, "0"));
}
