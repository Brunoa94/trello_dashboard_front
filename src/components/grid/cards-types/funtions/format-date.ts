export function formatDate(dateString: string) {
    // Parse the date string into a JavaScript Date object
    const date = new Date(dateString);

    // Extract the day and month, ensuring two-digit formatting
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed

    // Combine them in "DD-MM" format
    return `${day}-${month}`;
}
