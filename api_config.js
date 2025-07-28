/**
 * API Configuration for TikTok Account Location Finder
 * This file contains the API endpoint configuration and key
 */

// API Configuration Object
const API_CONFIG = {
  // Base API URL (without parameters)
  BASE_URL: 'https://api.omar-thing.site/',
  
  // API Key (keep this secure in production)
  API_KEY: 'MOORK0oI3uY7tG2hJ6kL9zX1cV5bNmM4q',
  
  // API Endpoint parameters
  PARAMS: {
    key: 'MOORK0oI3uY7tG2hJ6kL9zX1cV5bNmM4q',
    username: 'usernameHERE'
  },
  
  // Rate limiting settings (for client-side guidance)
  RATE_LIMIT: {
    requestsPerMinute: 30,
    retryAfter: 60 // seconds
  }
};

/**
 * Constructs the complete API URL for a given TikTok username
 * @param {string} username - The TikTok username to lookup
 * @returns {string} Complete API URL with parameters
 */
function getApiUrl(username) {
  if (!username || typeof username !== 'string' || username.trim() === '') {
    console.error('Invalid username provided to getApiUrl');
    return null;
  }
  
  try {
    // Encode the username to handle special characters
    const encodedUsername = encodeURIComponent(username.trim());
    
    // Construct the URL with parameters
    return `${API_CONFIG.BASE_URL}?key=${API_CONFIG.API_KEY}&username=${encodedUsername}`;
  } catch (error) {
    console.error('Error constructing API URL:', error);
    return null;
  }
}
