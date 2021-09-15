export function formatDateFromString(date: string, locale: string): string {
    return new Date(date).toLocaleDateString(locale);
}