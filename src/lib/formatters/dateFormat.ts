import { formatDate as formatDateFns  } from "date-fns";

export function formatDate(date: Date) {
    return formatDateFns(date, "MMM d, yyyy h:mm:ss aa");
}

export function formatFormDate(date: Date) {
    const dateClone = new Date(date);
    dateClone.setMinutes(dateClone.getMinutes() - dateClone.getTimezoneOffset());
    return dateClone.toISOString().slice(0, 16);
}

export function formatGraphMonthDate(date: Date) {
    return formatDateFns(date, "MMM yyyy");
}