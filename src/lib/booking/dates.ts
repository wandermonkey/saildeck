/**
 * Date helpers shared by the booking widget (client) and the admin calendar
 * (server). Both need to be careful: `new Date().toISOString()` converts to
 * UTC, which silently shifts the calendar date by one day for anyone west or
 * east of UTC depending on the time of day and offset direction — a real bug
 * for a Mumbai-based business running UTC+5:30. These helpers avoid that.
 */

/** Today's date as YYYY-MM-DD in the runtime's own local timezone, built
 *  from local date components rather than a UTC conversion. */
export function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Adds days to a YYYY-MM-DD string using pure UTC arithmetic, so the result
 *  never depends on (or drifts with) the runtime's local timezone. */
export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}
