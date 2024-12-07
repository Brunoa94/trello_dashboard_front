export function formatDate(dateString: string) {
    // Parse the date string into a JavaScript Date object
    const date = new Date(dateString);

    // Extract the month number (1-indexed)
    const monthNumber = date.getUTCMonth() + 1;

    // Map of abbreviated month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Get the abbreviated month name
    const monthName = monthNames[date.getUTCMonth()];

    // Return the month number and name
    return `${monthNumber} ${monthName}.`.toLowerCase();
}
