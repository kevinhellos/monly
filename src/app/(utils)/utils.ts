export function getFirstLetterCapitalized(str: string) {
  if (str && str.length > 0) {
    return str.charAt(0).toUpperCase();
  } else {
    return "";
  }
}    

export function getTodaysDateFormatted(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Note: getMonth() returns zero-based index (0 for January)
  const day = currentDate.getDate();
  
  // Formatted current date as string (e.g., "2024-07-07")
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  return formattedDate;
}