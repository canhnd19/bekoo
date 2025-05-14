/**
 * Formats a timestamp into a relative time string (e.g., "just now", "1 minute ago", "2 hours ago")
 * @param timestamp - ISO timestamp string (e.g., "2025-05-14T02:45:29.854236")
 * @returns Formatted relative time string
 */
export function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Handle future dates
  if (seconds < 0) {
    return 'in the future'
  }

  // Time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }

  // Check each interval
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)

    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`
    }
  }

  return 'just now'
}

/**
 * Alternative format that returns more precise time for recent messages
 * and calendar dates for older messages (more like Facebook's actual format)
 */
export function formatFacebookStyle(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Handle future dates
  if (seconds < 0) {
    return 'in the future'
  }

  // Less than a minute
  if (seconds < 60) {
    return 'just now'
  }

  // Less than an hour
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  }

  // Less than a day
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600)
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  }

  // Less than a week
  if (seconds < 604800) {
    const days = Math.floor(seconds / 86400)
    return days === 1 ? 'Yesterday' : `${days} days ago`
  }

  // Format date based on how old it is
  const currentYear = now.getFullYear()
  const messageYear = date.getFullYear()

  // Different year
  if (messageYear < currentYear) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Same year
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}
