import { formatDate as formatDateFns  } from "date-fns";

export function formatDate(date: Date) {
    return formatDateFns(date, "MMM d, yyyy hh:mm:ss");
}

export function formatFormDate(date: Date) {
    const dateClone = new Date(date);
    dateClone.setMinutes(dateClone.getMinutes() - dateClone.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
}