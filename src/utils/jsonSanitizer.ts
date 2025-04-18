/**
 * Sanitizes a JSON string by removing or escaping invalid control characters
 * that would cause JSON.parse to fail
 */
export function sanitizeJsonString(jsonString: string): string {
  if (typeof jsonString !== 'string') {
    return jsonString
  }

  /*eslint no-control-regex: "off"*/
  // Replace invalid control characters that aren't allowed in JSON
  return jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, (char) => {
    // For common whitespace characters, use proper JSON escape
    if (char === '\n') return '\\n'
    if (char === '\r') return '\\r'
    if (char === '\t') return '\\t'
    if (char === '\b') return '\\b'
    if (char === '\f') return '\\f'

    // For other control characters, remove them or replace with space
    return ''
  })
}

/**
 * Safely parses JSON with error handling and sanitization
 */
export function safeJsonParse(data: string): any {
  try {
    return JSON.parse(data)
  } catch (error) {
    // First attempt failed, try sanitizing the string
    try {
      const sanitized = sanitizeJsonString(data)
      return JSON.parse(sanitized)
    } catch (_secondError) {
      // If it still fails, throw the original error
      throw error
    }
  }
}
