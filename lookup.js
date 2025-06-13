/**
 * JavaScript for the TikTok User Lookup functionality on the home page.
 */
document.addEventListener('DOMContentLoaded', () => {
    const getResultsBtn = document.getElementById('getResultsBtn');
    const supportBtn = document.getElementById('supportBtn');
    const usernameInput = document.getElementById('username');

    if (getResultsBtn) {
        getResultsBtn.addEventListener('click', lookupUser);
    }
    if (supportBtn) {
        supportBtn.addEventListener('click', () => window.open('https://ko-fi.com/moroccan', '_blank'));
    }
    if (usernameInput) {
        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                lookupUser();
            }
        });
    }
});

function getCountryFlag(country) {
    const flagMap = { 'US': '🇺🇸', 'United States': '🇺🇸', 'CA': '🇨🇦', 'Canada': '🇨🇦', 'GB': '🇬🇧', 'United Kingdom': '🇬🇧', 'AU': '🇦🇺', 'Australia': '🇦🇺', 'DE': '🇩🇪', 'Germany': '🇩🇪', 'FR': '🇫🇷', 'France': '🇫🇷', 'TR': '🇹🇷', 'Turkey': '🇹🇷', /* Add more as needed */ };
    if (!country) return '🌐';
    const normalizedCountry = String(country).trim();
    for (const key in flagMap) {
        if (key.toLowerCase() === normalizedCountry.toLowerCase()) return flagMap[key];
    }
    return '🌐';
}

function lookupUser() {
    const usernameInput = document.getElementById('username');
    const resultDiv = document.getElementById('result');
    const getResultsBtn = document.getElementById('getResultsBtn');
    const username = usernameInput ? usernameInput.value.trim() : '';

    if (!username) {
        resultDiv.innerHTML = '<div class="message error-message">Please enter a valid TikTok username.</div>';
        return;
    }

    if (typeof API_CONFIG === 'undefined' || typeof getApiUrl === 'undefined') {
        resultDiv.innerHTML = '<div class="message error-message">API configuration error. Please check console.</div>';
        console.error("api_config.js is not loaded or getApiUrl function is missing.");
        return;
    }

    getResultsBtn.disabled = true;
    resultDiv.innerHTML = '<div class="loading-spinner-container"><div class="loading-spinner"></div> Loading profile data...</div>';

    const apiUrl = getApiUrl(username);
    if (!apiUrl) {
        resultDiv.innerHTML = '<div class="message error-message">Could not construct API URL.</div>';
        getResultsBtn.disabled = false;
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text || `Request failed with status ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            const apiProfile = data.profile || data;
            if (apiProfile && typeof apiProfile === 'object' && Object.keys(apiProfile).length > 0) {
                renderProfile(apiProfile, username);
            } else {
                throw new Error('Profile data not found or is incomplete.');
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            resultDiv.innerHTML = `<div class="message error-message">Error: ${error.message}. The user may not exist or the API is unavailable.</div>`;
        })
        .finally(() => {
            getResultsBtn.disabled = false;
        });
}

function renderProfile(apiProfile, username) {
    const resultDiv = document.getElementById('result');
    const sanitize = (str) => {
        if (typeof str !== 'string') return str === null || typeof str === 'undefined' ? '' : String(str);
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    const profilePhoto = sanitize(apiProfile['Profile Photo'] || apiProfile.avatar_url || '');
    const nickname = sanitize(apiProfile.Nickname || apiProfile.name || username);
    let displayUsername = sanitize(apiProfile.Username || apiProfile.username || username);
    if (!displayUsername.startsWith('@')) {
        displayUsername = '@' + displayUsername;
    }

    let profileDetailsHtml = '';
    const handledKeys = ['Profile Photo', 'avatar_url', 'Nickname', 'name', 'Username', 'username'];

    for (const key in apiProfile) {
        if (Object.hasOwnProperty.call(apiProfile, key) && !handledKeys.includes(key) && apiProfile[key] != null) {
            let displayKey = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();
            let value = apiProfile[key];

            let valueHtml = '';
            if (['Bio', 'bio', 'description', 'Signature'].includes(key)) {
                valueHtml = `<div class="profile-info-row bio-row"><span class="info-label">${displayKey}:</span><p class="info-value bio-text">${sanitize(value).replace(/\n/g, '<br>') || 'N/A'}</p></div>`;
            } else {
                 let displayValue = sanitize(String(value));
                 if (['Country', 'country', 'region'].includes(key)) {
                    displayValue = `${getCountryFlag(value)} ${displayValue}`;
                 } else if (typeof value === 'number') {
                    displayValue = value.toLocaleString();
                 }
                 valueHtml = `<div class="profile-info-row"><span class="info-label">${displayKey}:</span><span class="info-value">${displayValue}</span></div>`;
            }
            profileDetailsHtml += valueHtml;
        }
    }
    
    const formattedData = `
      <article class="profile-card">
        <div class="profile-card-header">
          ${profilePhoto ? `<img src="${profilePhoto}" alt="Profile photo" class="profile-photo-enhanced" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ''}
          <div class="profile-photo-placeholder" style="${profilePhoto ? 'display:none;' : 'display:flex;'}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div class="profile-identity">
            <h3 class="profile-nickname">${nickname}</h3>
            <p class="profile-username-display">${displayUsername}</p>
          </div>
        </div>
        <div class="profile-card-body">${profileDetailsHtml}</div>
        <div class="profile-card-footer"><span class="message success-message">Profile data retrieved successfully!</span></div>
      </article>`;
      
    resultDiv.innerHTML = formattedData;
}
