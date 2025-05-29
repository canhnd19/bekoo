/**
 * Converts a Unix timestamp (milliseconds) to ISO 8601 format with microsecond precision
 * @param timestamp - Unix timestamp in milliseconds
 * @returns ISO 8601 formatted date string with microsecond precision
 */
export function convertTimestampToISO(timestamp: number): string {
  // Create a Date object from the timestamp
  const date = new Date(timestamp)

  // Extract date components
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth() returns 0-11
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  // Pad single digits with leading zeros
  const pad = (num: number): string => num.toString().padStart(2, '0')

  // Format date and time components
  const formattedDate = `${year}-${pad(month)}-${pad(day)}`
  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`

  // Convert milliseconds to microseconds (6 decimal places)
  // JavaScript only provides millisecond precision, so we'll pad with zeros
  const formattedMicroseconds = (milliseconds * 1000).toString().padStart(6, '0')

  // Combine into ISO format
  return `${formattedDate}T${formattedTime}.${formattedMicroseconds}`
}
