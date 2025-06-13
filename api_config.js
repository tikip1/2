// api_config.js

// This file contains the configuration for the API endpoint.
// The main application will depend on this file to function correctly.

// Define the base API URL for the TikTok user lookup service
const API_CONFIG = {
  // The actual target API endpoint
  baseApiUrl: 'https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-67a396e1-78e9-4dff-8f6a-0f07c2d80c56/default/sm-t/',
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
