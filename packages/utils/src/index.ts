/** Indian Rupee formatting — design system §9.23 */
export function formatInr(amountPaiseOrRupees: number, options?: { fromPaise?: boolean }): string {
  const rupees = options?.fromPaise ? amountPaiseOrRupees / 100 : amountPaiseOrRupees;
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: Number.isInteger(rupees) ? 0 : 2,
    minimumFractionDigits: Number.isInteger(rupees) ? 0 : 2,
  }).format(rupees);
  return `₹${formatted}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}
