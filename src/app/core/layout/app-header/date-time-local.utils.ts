const padWithZero = (value: number): string => value.toString().padStart(2, '0');

/** Formats a date for an `<input type="datetime-local">`, e.g. '2026-11-17T14:30'. */
export const toDateTimeLocalValue = (date: Date): string => {
    const day = `${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}-${padWithZero(date.getDate())}`;
    const time = `${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}`;
    return `${day}T${time}`;
};

/** Returns `null` when the input is empty or incomplete. */
export const fromDateTimeLocalValue = (value: string): Date | null => {
    const date = new Date(value);
    const isValidDate = !Number.isNaN(date.getTime());
    return isValidDate ? date : null;
};
