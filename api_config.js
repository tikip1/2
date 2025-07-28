// api_config.js

// This file contains the configuration for the API endpoint.
// The main application will depend on this file to function correctly.

// Define the base API URL for the TikTok user lookup service
const API_CONFIG = {
  // The actual target API endpoint
  baseApiUrl: 'https://api.omar-thing.site/?key=MOORK0oI3uY7tG2hJ6kL9zX1cV5bNmM4q/default/sm-t/',
  // The CORS proxy to use, if needed.
  // If your API endpoint has CORS enabled, you might not need a proxy.
  corsProxyUrl: 'https://corsproxy.io/?'
};

// You could also add a function here to construct the full URL if it becomes more complex
function getApiUrl(username) {
  if (!API_CONFIG.baseApiUrl) {
    console.error("API base URL is not configured in api_config.js");
    return null;
  }
  const targetApiUrl = `${API_CONFIG.baseApiUrl}?username=${encodeURIComponent(username)}`;
  
  // Use CORS proxy if configured
  if (API_CONFIG.corsProxyUrl) {
    return `${API_CONFIG.corsProxyUrl}${encodeURIComponent(targetApiUrl)}`;
  }
  return targetApiUrl;
}

// To make it clear that this file has loaded (optional, for debugging)
console.log("api_config.js loaded successfully.");
