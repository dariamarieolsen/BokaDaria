export function canCancel(start: Date): boolean {
  const now = Date.now();
  const ms24h = 24 * 60 * 60 * 1000;
  return start.getTime() - now >= ms24h;
}
