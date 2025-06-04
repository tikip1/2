// script.js

// ===== THEME TOGGLE FUNCTIONALITY ===== //
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function initializeTheme() {
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      let theme = document.documentElement.getAttribute('data-theme');
      theme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('svg');
  if (!icon) return;

  const moonIconPath = '<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>';
  const sunIconPath = '<path d="M12 18a6 6 0 1 1 0-12 6 6 0 1 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 1 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>';

  icon.innerHTML = theme === 'dark' ? moonIconPath : sunIconPath;
}

// ===== CONTACT FORM SUBMISSION (for contact.html) ===== //
const contactSubmitButton = document.getElementById('contact-submit');
const contactForm = document.getElementById('contactForm');
const formFeedbackDiv = document.getElementById('form-feedback'); // Updated ID for contact form feedback

if (contactForm && contactSubmitButton) { // formFeedbackDiv is optional here, use showAlert
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (name && email && message) {
        if (!email.includes('@') || !email.includes('.')) {
            showAlert('Please enter a valid email address.'); // Use custom alert
            return;
        }
        console.log("Contact form submitted:", { name, email, message });
        showAlert('Thank you for your message! We will get back to you soon. (Demo)'); // Use custom alert
        contactForm.reset();
      } else {
        showAlert('Please fill in all fields in the contact form.'); // Use custom alert
      }
    });
}

// ===== COUNTRY FLAG MAPPING (Utility Function) ===== //
function getCountryFlag(country) {
  const flagMap = {
    'AD': '🇦🇩', 'Andorra': '🇦🇩', 'AE': '🇦🇪', 'United Arab Emirates': '🇦🇪', 'AF': '🇦🇫', 'Afghanistan': '🇦🇫',
    'AG': '🇦🇬', 'Antigua and Barbuda': '🇦🇬', 'AI': '🇦🇮', 'Anguilla': '🇦🇮', 'AL': '🇦🇱', 'Albania': '🇦🇱',
    'AM': '🇦🇲', 'Armenia': '🇦🇲', 'AO': '🇦🇴', 'Angola': '🇦🇴', 'AQ': '🇦🇶', 'Antarctica': '🇦🇶',
    'AR': '🇦🇷', 'Argentina': '🇦🇷', 'AS': '🇦🇸', 'American Samoa': '🇦🇸', 'AT': '🇦🇹', 'Austria': '🇦🇹',
    'AU': '🇦🇺', 'Australia': '🇦🇺', 'AW': '🇦🇼', 'Aruba': '🇦🇼', 'AX': '🇦🇽', 'Åland Islands': '🇦🇽',
    'AZ': '🇦🇿', 'Azerbaijan': '🇦🇿', 'BA': '🇧🇦', 'Bosnia and Herzegovina': '🇧🇦', 'BB': '🇧🇧', 'Barbados': '🇧🇧',
    'BD': '🇧🇩', 'Bangladesh': '🇧🇩', 'BE': '🇧🇪', 'Belgium': '🇧🇪', 'BF': '🇧🇫', 'Burkina Faso': '🇧🇫',
    'BG': '🇧🇬', 'Bulgaria': '🇧🇬', 'BH': '🇧🇭', 'Bahrain': '🇧🇭', 'BI': '🇧🇮', 'Burundi': '🇧🇮',
    'BJ': '🇧🇯', 'Benin': '🇧🇯', 'BL': '🇧🇱', 'Saint Barthélemy': '🇧🇱', 'BM': '🇧🇲', 'Bermuda': '🇧🇲',
    'BN': '🇧🇳', 'Brunei Darussalam': '🇧🇳', 'BO': '🇧🇴', 'Bolivia': '🇧�', 'BQ': '🇧🇶', 'Bonaire, Sint Eustatius and Saba': '🇧🇶',
    'BR': '🇧🇷', 'Brazil': '🇧🇷', 'BS': '🇧🇸', 'Bahamas': '🇧🇸', 'BT': '🇧🇹', 'Bhutan': '🇧🇹',
    'BV': '🇧🇻', 'Bouvet Island': '🇧🇻', 'BW': '🇧🇼', 'Botswana': '🇧🇼', 'BY': '🇧🇾', 'Belarus': '🇧🇾',
    'BZ': '🇧🇿', 'Belize': '🇧🇿', 'CA': '🇨🇦', 'Canada': '🇨🇦', 'CC': '🇨🇨', 'Cocos (Keeling) Islands': '🇨🇨',
    'CD': '🇨🇩', 'Congo, Democratic Republic of the': '🇨🇩', 'CF': '🇨🇫', 'Central African Republic': '🇨🇫', 'CG': '🇨🇬', 'Congo, Republic of the': '🇨🇬',
    'CH': '🇨🇭', 'Switzerland': '🇨🇭', 'CI': '🇨🇮', "Côte D'Ivoire": '🇨🇮', 'CK': '🇨🇰', 'Cook Islands': '🇨🇰',
    'CL': '🇨🇱', 'Chile': '🇨🇱', 'CM': '🇨🇲', 'Cameroon': '🇨🇲', 'CN': '🇨🇳', 'China': '🇨🇳',
    'CO': '🇨🇴', 'Colombia': '🇨🇴', 'CR': '🇨🇷', 'Costa Rica': '🇨🇷', 'CU': '🇨🇺', 'Cuba': '🇨🇺',
    'CV': '🇨🇻', 'Cape Verde': '🇨🇻', 'CW': '🇨🇼', 'Curaçao': '🇨🇼', 'CX': '🇨🇽', 'Christmas Island': '🇨🇽',
    'CY': '🇨🇾', 'Cyprus': '🇨🇾', 'CZ': '🇨🇿', 'Czech Republic': '🇨🇿', 'DE': '🇩🇪', 'Germany': '🇩🇪',
    'DJ': '🇩🇯', 'Djibouti': '🇩🇯', 'DK': '🇩🇰', 'Denmark': '🇩🇰', 'DM': '🇩🇲', 'Dominica': '🇩🇲',
    'DO': '🇩🇴', 'Dominican Republic': '🇩🇴', 'DZ': '🇩🇿', 'Algeria': '🇩🇿', 'EC': '🇪🇨', 'Ecuador': '🇪🇨',
    'EE': '🇪🇪', 'Estonia': '🇪🇪', 'EG': '🇪🇬', 'Egypt': '🇪🇬', 'EH': '🇪🇭', 'Western Sahara': '🇪🇭',
    'ER': '🇪🇷', 'Eritrea': '🇪🇷', 'ES': '🇪🇸', 'Spain': '🇪🇸', 'ET': '🇪🇹', 'Ethiopia': '🇪🇹',
    'FI': '🇫🇮', 'Finland': '🇫🇮', 'FJ': '🇫🇯', 'Fiji': '🇫🇯', 'FK': '🇫🇰', 'Falkland Islands (Malvinas)': '🇫🇰',
    'FM': '🇫🇲', 'Micronesia, Federated States of': '🇫🇲', 'FO': '🇫🇴', 'Faroe Islands': '🇫🇴', 'FR': '🇫🇷', 'France': '🇫🇷',
    'GA': '🇬🇦', 'Gabon': '🇬🇦', 'GB': '🇬🇧', 'United Kingdom': '🇬🇧', 'UK': '🇬🇧', 'GD': '🇬🇩', 'Grenada': '🇬🇩',
    'GE': '🇬🇪', 'Georgia': '🇬🇪', 'GF': '🇬🇫', 'French Guiana': '🇬🇫', 'GG': '🇬🇬', 'Guernsey': '🇬🇬',
    'GH': '🇬🇭', 'Ghana': '🇬🇭', 'GI': '🇬🇮', 'Gibraltar': '🇬🇮', 'GL': '🇬🇱', 'Greenland': '🇬🇱',
    'GM': '🇬🇲', 'Gambia': '🇬🇲', 'GN': '🇬🇳', 'Guinea': '🇬🇳', 'GP': '🇬🇵', 'Guadeloupe': '🇬🇵',
    'GQ': '🇬🇶', 'Equatorial Guinea': '🇬🇶', 'GR': '🇬🇷', 'Greece': '🇬🇷', 'GS': '🇬🇸', 'South Georgia and the South Sandwich Islands': '🇬🇸',
    'GT': '🇬🇹', 'Guatemala': '🇬🇹', 'GU': '🇬🇺', 'Guam': '🇬🇺', 'GW': '🇬🇼', 'Guinea-Bissau': '🇬🇼',
    'GY': '🇬🇾', 'Guyana': '🇬🇾', 'HK': '🇭🇰', 'Hong Kong': '🇭🇰', 'HM': '🇭🇲', 'Heard Island and McDonald Islands': '🇭🇲',
    'HN': '🇭🇳', 'Honduras': '🇭🇳', 'HR': '🇭🇷', 'Croatia': '🇭🇷', 'HT': '🇭🇹', 'Haiti': '🇭🇹',
    'HU': '🇭🇺', 'Hungary': '🇭🇺', 'ID': '🇮🇩', 'Indonesia': '🇮🇩', 'IE': '🇮🇪', 'Ireland': '🇮🇪',
    'IL': '🇮🇱', 'Israel': '🇮🇱', 'IM': '🇮🇲', 'Isle of Man': '🇮🇲', 'IN': '🇮🇳', 'India': '🇮🇳',
    'IO': '🇮🇴', 'British Indian Ocean Territory': '🇮🇴', 'IQ': '🇮🇶', 'Iraq': '🇮🇶', 'IR': '🇮🇷', 'Iran, Islamic Republic of': '🇮🇷',
    'IS': '🇮🇸', 'Iceland': '🇮🇸', 'IT': '🇮🇹', 'Italy': '🇮🇹', 'JE': '🇯🇪', 'Jersey': '🇯🇪',
    'JM': '🇯🇲', 'Jamaica': '🇯🇲',
    'JO': '🇯🇴', 'Jordan': '🇯🇴', 'JP': '🇯🇵', 'Japan': '🇯🇵', 'KE': '🇰🇪', 'Kenya': '🇰🇪',
    'KG': '🇰🇬', 'Kyrgyzstan': '🇰🇬', 'KH': '🇰🇭', 'Cambodia': '🇰🇭', 'KI': '🇰🇮', 'Kiribati': '🇰🇮',
    'KM': '🇰🇲', 'Comoros': '🇰🇲', 'KN': '🇰🇳', 'Saint Kitts and Nevis': '🇰🇳', 'KP': '🇰🇵', "Korea, Democratic People's Republic of": '🇰🇵',
    'KR': '🇰🇷', 'Korea, Republic of': '🇰🇷',
    'KW': '🇰🇼', 'Kuwait': '🇰🇼', 'KY': '🇰🇾', 'Cayman Islands': '🇰🇾',
    'KZ': '🇰🇿', 'Kazakhstan': '🇰🇿', 'LA': '🇱🇦', "Lao People's Democratic Republic": '🇱🇦', 'LB': '🇱🇧', 'Lebanon': '🇱🇧',
    'LC': '🇱🇨', 'Saint Lucia': '🇱🇨', 'LI': '🇱🇮', 'Liechtenstein': '🇱🇮', 'LK': '🇱🇰', 'Sri Lanka': '🇱🇰',
    'LR': '🇱🇷', 'Liberia': '🇱🇷', 'LS': '🇱🇸', 'Lesotho': '🇱🇸', 'LT': '🇱🇹', 'Lithuania': '🇱🇹',
    'LU': '🇱🇺', 'Luxembourg': '🇱🇺', 'LV': '🇱🇻', 'Latvia': '🇱🇻', 'LY': '🇱🇾', 'Libya': '🇱🇾',
    'MA': '🇲🇦', 'Morocco': '🇲🇦', 'MC': '🇲🇨', 'Monaco': '🇲🇨', 'MD': '🇲🇩', 'Moldova, Republic of': '🇲🇩',
    'ME': '🇲🇪', 'Montenegro': '🇲🇪', 'MF': '🇲🇫', 'Saint Martin (French part)': '🇲🇫', 'MG': '🇲🇬', 'Madagascar': '🇲🇬',
    'MH': '🇲🇭', 'Marshall Islands': '🇲🇭', 'MK': '🇲🇰', 'North Macedonia': '🇲🇰', 'ML': '🇲🇱', 'Mali': '🇲🇱',
    'MM': '🇲🇲', 'Myanmar': '🇲🇲', 'MN': '🇲🇳', 'Mongolia': '🇲🇳', 'MO': '🇲🇴', 'Macao': '🇲🇴',
    'MP': '🇲🇵', 'Northern Mariana Islands': '🇲🇵', 'MQ': '🇲🇶', 'Martinique': '🇲🇶', 'MR': '🇲🇷', 'Mauritania': '🇲🇷',
    'MS': '🇲🇸', 'Montserrat': '🇲🇸', 'MT': '🇲🇹', 'Malta': '🇲🇹', 'MU': '🇲🇺', 'Mauritius': '🇲🇺',
    'MV': '🇲🇻', 'Maldives': '🇲🇻', 'MW': '🇲🇼', 'Malawi': '🇲🇼', 'MX': '🇲🇽', 'Mexico': '🇲🇽',
    'MY': '🇲🇾', 'Malaysia': '🇲🇾', 'MZ': '🇲🇿', 'Mozambique': '🇲🇿', 'NA': '🇳🇦', 'Namibia': '🇳🇦',
    'NC': '🇳🇨', 'New Caledonia': '🇳🇨', 'NE': '🇳🇪', 'Niger': '🇳🇪', 'NF': '🇳🇫', 'Norfolk Island': '🇳🇫',
    'NG': '🇳🇬', 'Nigeria': '🇳🇬', 'NI': '🇳🇮', 'Nicaragua': '🇳🇮', 'NL': '🇳🇱', 'Netherlands': '🇳🇱',
    'NO': '🇳🇴', 'Norway': '🇳🇴', 'NP': '🇳🇵', 'Nepal': '🇳🇵', 'NR': '🇳🇷', 'Nauru': '🇳🇷',
    'NU': '🇳🇺', 'Niue': '🇳🇺', 'NZ': '🇳🇿', 'New Zealand': '🇳🇿', 'OM': '🇴🇲', 'Oman': '🇴🇲',
    'PA': '🇵🇦', 'Panama': '🇵🇦', 'PE': '🇵🇪', 'Peru': '🇵🇪', 'PF': '🇵🇫', 'French Polynesia': '🇵🇫',
    'PG': '🇵🇬', 'Papua New Guinea': '🇵🇬', 'PH': '🇵🇭', 'Philippines': '🇵🇭', 'PK': '🇵🇰', 'Pakistan': '🇵🇰',
    'PL': '🇵🇱', 'Poland': '🇵🇱', 'PM': '🇵🇲', 'Saint Pierre and Miquelon': '🇵🇲', 'PN': '🇵🇳', 'Pitcairn': '🇵🇳',
    'PR': '🇵🇷', 'Puerto Rico': '🇵🇷', 'PS': '🇵🇸', 'Palestine, State of': '🇵🇸', 'PT': '🇵🇹', 'Portugal': '🇵🇹',
    'PW': '🇵🇼', 'Palau': '🇵🇼', 'PY': '🇵🇾', 'Paraguay': '🇵🇾', 'QA': '🇶🇦', 'Qatar': '🇶🇦',
    'RE': '🇷🇪', 'Réunion': '🇷🇪', 'RO': '🇷🇴', 'Romania': '🇷🇴', 'RS': '🇷🇸', 'Serbia': '🇷🇸',
    'RU': '🇷🇺', 'Russian Federation': '🇷🇺', 'Russia': '🇷🇺', 'RW': '🇷🇼', 'Rwanda': '🇷🇼', 'SA': '🇸🇦', 'Saudi Arabia': '🇸🇦',
    'SB': '🇸🇧', 'Solomon Islands': '🇸🇧', 'SC': '🇸🇨', 'Seychelles': '🇸🇨', 'SD': '🇸🇩', 'Sudan': '🇸🇩',
    'SE': '🇸🇪', 'Sweden': '🇸🇪', 'SG': '🇸🇬', 'Singapore': '🇸🇬', 'SH': '🇸🇭', 'Saint Helena, Ascension and Tristan da Cunha': '🇸🇭',
    'SI': '🇸🇮', 'Slovenia': '🇸🇮', 'SJ': '🇸🇯', 'Svalbard and Jan Mayen': '🇸🇯', 'SK': '🇸🇰', 'Slovakia': '🇸🇰',
    'SL': '🇸🇱', 'Sierra Leone': '🇸🇱', 'SM': '🇸🇲', 'San Marino': '🇸🇲', 'SN': '🇸🇳', 'Senegal': '🇸🇳',
    'SO': '🇸🇴', 'Somalia': '🇸🇴', 'SR': '🇸🇷', 'Suriname': '🇸🇷', 'SS': '🇸🇸', 'South Sudan': '🇸🇸',
    'ST': '🇸🇹', 'Sao Tome and Principe': '🇸🇹', 'SV': '🇸🇻', 'El Salvador': '🇸🇻', 'SX': '🇸🇽', 'Sint Maarten (Dutch part)': '🇸🇽',
    'SY': '🇸🇾', 'Syrian Arab Republic': '🇸🇾', 'SZ': '🇸🇿', 'Eswatini': '🇸🇿', 'TC': '🇹🇨', 'Turks and Caicos Islands': '🇹🇨',
    'TD': '🇹🇩', 'Chad': '🇹🇩', 'TF': '🇹🇫', 'French Southern Territories': '🇹🇫', 'TG': '🇹🇬', 'Togo': '🇹🇬',
    'TH': '🇹🇭', 'Thailand': '🇹🇭', 'TJ': '🇹🇯', 'Tajikistan': '🇹🇯', 'TK': '🇹🇰', 'Tokelau': '🇹🇰',
    'TL': '🇹🇱', 'Timor-Leste': '🇹🇱', 'TM': '🇹🇲', 'Turkmenistan': '🇹🇲', 'TN': '🇹🇳', 'Tunisia': '🇹🇳',
    'TO': '🇹🇴', 'Tonga': '🇹🇴', 'TR': '🇹🇷', 'Turkey': '🇹🇷', 'TT': '🇹🇹', 'Trinidad and Tobago': '🇹🇹',
    'TV': '🇹🇻', 'Tuvalu': '🇹🇻', 'TW': '🇹🇼', 'Taiwan, Province of China': '🇹🇼', 'TZ': '🇹🇿', 'Tanzania, United Republic of': '🇹🇿',
    'UA': '🇺🇦', 'Ukraine': '🇺🇦', 'UG': '🇺🇬', 'Uganda': '🇺🇬', 'UM': '🇺🇲', 'United States Minor Outlying Islands': '🇺🇲',
    'US': '🇺🇸', 'United States of America': '🇺🇸', 'USA': '🇺🇸', 'UY': '🇺🇾', 'Uruguay': '🇺🇾', 'UZ': '🇺🇿', 'Uzbekistan': '🇺🇿',
    'VA': '🇻🇦', 'Holy See (Vatican City State)': '🇻🇦', 'VC': '🇻🇨', 'Saint Vincent and the Grenadines': '🇻🇨', 'VE': '🇻🇪', 'Venezuela, Bolivarian Republic of': '🇻🇪',
    'VG': '🇻🇬', 'Virgin Islands, British': '🇻🇬', 'VI': '🇻🇮', 'Virgin Islands, U.S.': '🇻🇮', 'VN': '🇻🇳', 'Viet Nam': '🇻🇳',
    'VU': '🇻🇺', 'Vanuatu': '🇻🇺', 'WF': '🇼🇫', 'Wallis and Futuna': '🇼🇫', 'WS': '🇼🇸', 'Samoa': '🇼🇸',
    'XK': '🇽🇰', 'Kosovo': '🇽🇰', 'YE': '🇾🇪', 'Yemen': '🇾🇪', 'YT': '🇾🇹', 'Mayotte': '🇾🇹',
    'ZA': '🇿🇦', 'South Africa': '🇿🇦', 'ZM': '🇿🇲', 'Zambia': '🇿🇲', 'ZW': '🇿🇼', 'Zimbabwe': '🇿🇼'
  };
  if (!country) return '🌐';
  const normalizedCountry = String(country).trim();
  for (const key in flagMap) {
    if (key.toLowerCase() === normalizedCountry.toLowerCase()) return flagMap[key];
  }
  for (const key in flagMap) {
    if (key.length > 3 && normalizedCountry.toLowerCase().includes(key.toLowerCase())) return flagMap[key];
  }
  return '🌐';
}

// ===== TIKTOK USER LOOKUP FUNCTIONALITY (for index.html) ===== //
const getResultsBtn = document.getElementById('getResultsBtn');
const supportBtn = document.getElementById('supportBtn');
const usernameInput = document.getElementById('username');
const resultDiv = document.getElementById('result');

if (getResultsBtn) getResultsBtn.addEventListener('click', lookupUser);
if (supportBtn) supportBtn.addEventListener('click', () => window.open('https://ko-fi.com/moroccan', '_blank'));

function lookupUser() {
  if (!usernameInput || !resultDiv || !getResultsBtn) {
    console.warn("LookupUser called on a page without necessary elements.");
    return;
  }

  const username = usernameInput.value.trim();
  if (!username) {
    resultDiv.innerHTML = '<div class="message error-message">Please enter a valid TikTok username.</div>';
    resultDiv.style.display = 'block';
    return;
  }

  getResultsBtn.disabled = true;
  resultDiv.innerHTML = '<div class="loading-spinner-container"><div class="loading-spinner"></div> Loading profile data...</div>';
  resultDiv.style.display = 'block';

  // !!! IMPORTANT: API Call Change for Backend Proxy !!!
  // The client-side JavaScript will now call an endpoint on YOUR server.
  // You need to create this backend endpoint (e.g., /api/lookup-tiktok-user).
  // Your backend will then securely call the actual third-party API.
  const yourBackendProxyUrl = `/api/lookup-tiktok-user?username=${encodeURIComponent(username)}`;
  // const yourBackendProxyUrl = `https://yourdomain.com/api/lookup-tiktok-user?username=${encodeURIComponent(username)}`; // If using a full path

  console.log("Attempting to fetch data via YOUR backend proxy from:", yourBackendProxyUrl);

  fetch(yourBackendProxyUrl) // Call your backend proxy
    .then(response => {
      console.log("Received response status from your proxy:", response.status);
      if (!response.ok) {
        // Handle errors from your proxy (e.g., your proxy couldn't reach the API, or your proxy itself has an error)
        return response.text().then(text => {
            let errorMsg = `Request to your server failed with status ${response.status}.`;
            try {
                const errData = JSON.parse(text);
                errorMsg = errData.message || errData.error || text || errorMsg;
            } catch (e) {
                errorMsg = text || errorMsg;
            }
            console.error("Your Proxy API Error:", errorMsg, "Raw text:", text);
            throw new Error(errorMsg);
        });
      }
      return response.json(); // Expecting your proxy to return JSON
    })
    .then(data => {
      // Process the data received from YOUR backend proxy
      // This data should be the profile information originally from the TikTok API
      console.log("Data from your proxy:", JSON.stringify(data, null, 2));
      const apiProfile = data.profile || data; // Adjust based on how your proxy formats the response

      if (apiProfile && typeof apiProfile === 'object' && Object.keys(apiProfile).length > 0) {
        const sanitize = (str) => {
            if (typeof str !== 'string') return str === null || typeof str === 'undefined' ? '' : String(str);
            const temp = document.createElement('div');
            temp.textContent = str;
            return temp.innerHTML;
        };

        let foundProfilePhotoUrl = '';
        const avatarKeys = ['Profile Photo', 'Avatar URL', 'avatar_url', 'avatarUrl', 'picture', 'profileImageUrl', 'profile_pic_url', 'profile_image_url', 'avatar', 'Avatar', 'profile_picture', 'photo_url', 'user_avatar'];
        for (const key of avatarKeys) {
            if (apiProfile[key] && typeof apiProfile[key] === 'string' && apiProfile[key].trim() !== '') {
                foundProfilePhotoUrl = apiProfile[key];
                break;
            }
        }
        const profilePhoto = foundProfilePhotoUrl ? sanitize(foundProfilePhotoUrl) : '';

        let rawUsernameFromAPI = apiProfile.Username || apiProfile.username || apiProfile.user_name || apiProfile.unique_id || username;
        if (typeof rawUsernameFromAPI === 'string' && rawUsernameFromAPI.startsWith('@')) {
            rawUsernameFromAPI = rawUsernameFromAPI.substring(1);
        }
        const displayUsername = sanitize(rawUsernameFromAPI);
        const displayNickname = apiProfile.Nickname || apiProfile.nickname || apiProfile.name || apiProfile.display_name || apiProfile.user_display_name || displayUsername;

        let profileDetailsHtml = '';
        for (const key in apiProfile) {
            if (Object.hasOwnProperty.call(apiProfile, key)) {
                if (['Nickname', 'nickname', 'Username', 'username', 'name', 'display_name', 'user_name', 'unique_id', 'user_display_name', ...avatarKeys].includes(key) ||
                    apiProfile[key] == null || String(apiProfile[key]).trim() === '') {
                    continue;
                }
                let displayKey = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();
                if (displayKey.toLowerCase() === 'sec u i d' || displayKey.toLowerCase() === 'username last modified') {
                    continue;
                }
                let value = apiProfile[key];
                if (['Bio', 'bio', 'description', 'Signature', 'bio_text', 'user_bio'].includes(key)) {
                    value = sanitize(String(value)).replace(/\n/g, '<br>');
                    profileDetailsHtml += `<div class="profile-info-row bio-row"><span class="info-label">${sanitize(displayKey)}:</span><p class="info-value bio-text">${value || 'N/A'}</p></div>`;
                } else if (['Country', 'country', 'region', 'Location', 'country_code', 'user_region'].includes(key)) {
                    value = sanitize(String(value));
                    profileDetailsHtml += `<div class="profile-info-row"><span class="info-label">${sanitize(displayKey)}:</span><span class="info-value">${getCountryFlag(value)} ${value || 'N/A'}</span></div>`;
                } else if (typeof value === 'number' && (key.toLowerCase().includes('follower') || key.toLowerCase().includes('following') || key.toLowerCase().includes('like') || key.toLowerCase().includes('video') || key.toLowerCase().includes('count') || key.toLowerCase().includes('digg'))) {
                    value = Number(value).toLocaleString();
                    profileDetailsHtml += `<div class="profile-info-row"><span class="info-label">${sanitize(displayKey)}:</span><span class="info-value">${value}</span></div>`;
                } else if (typeof value === 'boolean') {
                    value = value ? 'Yes' : 'No';
                    profileDetailsHtml += `<div class="profile-info-row"><span class="info-label">${sanitize(displayKey)}:</span><span class="info-value">${value}</span></div>`;
                } else if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
                    profileDetailsHtml += `<div class="profile-info-row"><span class="info-label">${sanitize(displayKey)}:</span><span class="info-value"><a href="${sanitize(value)}" target="_blank" rel="noopener noreferrer" class="dm-link">${sanitize(value)}</a></span></div>`;
                } else {
                    profileDetailsHtml += `<div class="profile-info-row"><span class="info-label">${sanitize(displayKey)}:</span><span class="info-value">${sanitize(String(value)) || 'N/A'}</span></div>`;
                }
            }
        }

        if (profileDetailsHtml.trim() === '') {
             resultDiv.innerHTML = `<div class="message error-message">No displayable profile data found for '${sanitize(username)}'.</div>`;
             getResultsBtn.disabled = false;
             return;
        }

        let formattedData = `
          <article class="profile-card" aria-labelledby="profile-card-heading-${displayUsername}">
            <h2 id="profile-card-heading-${displayUsername}" class="sr-only">Profile details for ${sanitize(displayNickname)}</h2>
            <div class="profile-card-header">
              ${profilePhoto ? `<img src="${profilePhoto}" alt="Profile photo of ${sanitize(displayNickname)}" class="profile-photo-enhanced" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ''}
              <div class="profile-photo-placeholder" style="${profilePhoto ? 'display:none;' : 'display:flex;'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <div class="profile-identity">
                <h3 class="profile-nickname">${sanitize(displayNickname)}</h3>
                <p class="profile-username-display">${sanitize(displayUsername).startsWith('@') ? sanitize(displayUsername) : '@' + sanitize(displayUsername)}</p>
              </div>
            </div>
            <div class="profile-card-body">${profileDetailsHtml}</div>
            <div class="profile-card-footer"><span class="message success-message">Profile data retrieved successfully!</span></div>
          </article>`;
        resultDiv.innerHTML = formattedData;
      } else {
        console.warn("Profile data from your proxy is missing or in unexpected format.", "Received data:", data);
        resultDiv.innerHTML = `<div class="message error-message">Profile data not found or is incomplete for '${sanitize(username)}'.</div>`;
      }
    })
    .catch(error => {
      console.error("Fetch or processing error (your proxy or API):", error);
      resultDiv.innerHTML = `<div class="message error-message">Error: ${error.message || 'Failed to fetch profile data'}. Please try again.</div>`;
    })
    .finally(() => {
      getResultsBtn.disabled = false;
    });
}

if (usernameInput) {
  usernameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (typeof lookupUser === 'function') {
          lookupUser();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
    const appWrapper = document.getElementById('app-wrapper');
    if (appWrapper) {
        appWrapper.style.display = 'flex';
    }
    const scriptErrorMsg = document.getElementById('script-error-message');
    if (scriptErrorMsg) {
        scriptErrorMsg.style.display = 'none';
    }
    if (typeof initializeTheme === 'function') {
        initializeTheme();
    }
});

const customAlertOverlay = document.getElementById('customAlertOverlay');
const customAlertMessageEl = document.getElementById('customAlertMessage');
const customAlertCloseBtn = document.getElementById('customAlertClose');

function showAlert(message) {
    if (customAlertMessageEl && customAlertOverlay) {
        customAlertMessageEl.textContent = message;
        customAlertOverlay.classList.add('active');
    } else {
        console.warn("Custom alert elements not found. Alert message:", message);
    }
}

if (customAlertCloseBtn && customAlertOverlay) {
    customAlertCloseBtn.addEventListener('click', () => {
        customAlertOverlay.classList.remove('active');
    });
    customAlertOverlay.addEventListener('click', (event) => {
        if (event.target === customAlertOverlay) {
            customAlertOverlay.classList.remove('active');
        }
    });
}
