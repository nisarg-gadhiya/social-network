/**
 * Format a date for display
 * @param {Date|string|number} date - The date to format
 * @param {string} format - The format to use (default, time, date, datetime, relative)
 * @returns {string} The formatted date string
 */
export const formatDate = (date, format = "default") => {
    if (!date) return ""
  
    // Convert to Date object if not already
    const dateObj = date instanceof Date ? date : new Date(date)
  
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return ""
    }
  
    switch (format) {
      case "time":
        return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  
      case "date":
        return dateObj.toLocaleDateString()
  
      case "datetime":
        return dateObj.toLocaleString()
  
      case "relative":
        return getRelativeTimeString(dateObj)
  
      default:
        // Default format based on how recent the date is
        const now = new Date()
        const diffMs = now.getTime() - dateObj.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
        if (diffDays === 0) {
          // Today, show time
          return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        } else if (diffDays === 1) {
          // Yesterday
          return "Yesterday"
        } else if (diffDays < 7) {
          // Within a week, show day name
          return dateObj.toLocaleDateString([], { weekday: "long" })
        } else {
          // Older, show full date
          return dateObj.toLocaleDateString()
        }
    }
  }
  
  /**
   * Get a relative time string (e.g., "2 hours ago", "just now")
   * @param {Date} date - The date to format
   * @returns {string} The relative time string
   */
  const getRelativeTimeString = (date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
  
    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)
  
    if (seconds < 5) {
      return "just now"
    } else if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    } else if (days < 30) {
      return `${days} day${days !== 1 ? "s" : ""} ago`
    } else if (months < 12) {
      return `${months} month${months !== 1 ? "s" : ""} ago`
    } else {
      return `${years} year${years !== 1 ? "s" : ""} ago`
    }
  }
  
  