
// script.js

// ===== THEME TOGGLE FUNCTIONALITY ===== //
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to initialize and apply the theme
function initializeTheme() {
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
}

// Add event listener for theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      let theme = document.documentElement.getAttribute('data-theme');
      theme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
}

// Function to update the theme icon based on the current theme
function updateThemeIcon(theme) {
  if (!themeToggle) return; // Guard clause if themeToggle is not found
  const icon = themeToggle.querySelector('svg');
  if (!icon) return; // Guard clause if icon is not found

  // Paths for Moon (dark theme) and Sun (light theme) icons
  const moonIconPath = '<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>';
  const sunIconPath = '<path d="M12 18a6 6 0 1 1 0-12 6 6 0 1 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 1 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>';

  if (theme === 'dark') {
    icon.innerHTML = moonIconPath;
  } else {
    icon.innerHTML = sunIconPath;
  }
}

// ===== CONTACT FORM SUBMISSION (for contact.html) ===== //
const contactSubmitButton = document.getElementById('contact-submit');
const contactForm = document.getElementById('contactForm'); // Assuming form has id="contactForm"
const formFeedbackDiv = document.getElementById('result'); // Using #result div on contact page for feedback

if (contactForm && contactSubmitButton && formFeedbackDiv) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message'); // Matches ID in contact.html

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      formFeedbackDiv.innerHTML = ''; // Clear previous messages
      formFeedbackDiv.style.display = 'none';


      if (name && email && message) {
        if (!email.includes('@') || !email.includes('.')) {
            formFeedbackDiv.innerHTML = '<div class="message error-message">Please enter a valid email address.</div>';
            formFeedbackDiv.style.display = 'block';
            return;
        }

        // Simulate sending message
        console.log("Contact form submitted:", { name, email, message });
        formFeedbackDiv.innerHTML = '<div class="message success-message">Thank you for your message! We will get back to you soon. (Demo)</div>';
        formFeedbackDiv.style.display = 'block';

        contactForm.reset(); // Reset the form fields

        // Optional: Auto-hide message after a few seconds
        setTimeout(() => {
            if (formFeedbackDiv.firstChild && formFeedbackDiv.firstChild.classList.contains('success-message')) {
                formFeedbackDiv.style.display = 'none';
                formFeedbackDiv.innerHTML = '';
            }
        }, 4000);

      } else {
        formFeedbackDiv.innerHTML = '<div class="message error-message">Please fill in all fields in the contact form.</div>';
        formFeedbackDiv.style.display = 'block';
        setTimeout(() => {
             if (formFeedbackDiv.firstChild && formFeedbackDiv.firstChild.classList.contains('error-message')) {
                formFeedbackDiv.style.display = 'none';
                formFeedbackDiv.innerHTML = '';
             }
        }, 4000);
      }
    });
}


// ===== COUNTRY FLAG MAPPING (Utility Function) ===== //
function getCountryFlag(country) {
  const flagMap = {
    'AD': '🇦🇩', 'Andorra': '🇦🇩', 'AE': '🇦🇪', 'United Arab Emirates': '🇦🇪', 'AF': '🇦🇫', 'Afghanistan': '🇦🇫',
    'AG': '🇦🇬', 'Antigua and Barbuda': '🇦🇬', 'AI': '🇦🇮', 'Anguilla': '🇦🇮', 'AL': '🇦🇱', 'Albania': '🇦🇱',
    'AM': '🇦🇲', 'Armenia': '🇦🇲', 'AO': '🇦🇴', 'Angola': '🇦🇴', 'AQ': '🇦🇶', 'Antarctica': '🇦🇶',
    'AR': '🇦🇷', 'Argentina': '🇦🇷', 'AS': '🇦🇸', 'American Samoa': '🇦�', 'AT': '🇦🇹', 'Austria': '🇦🇹',
    'AU': '🇦🇺', 'Australia': '🇦🇺', 'AW': '🇦🇼', 'Aruba': '🇦🇼', 'AX': '🇦🇽', 'Åland Islands': '🇦🇽',
    'AZ': '🇦🇿', 'Azerbaijan': '🇦🇿', 'BA': '🇧🇦', 'Bosnia and Herzegovina': '🇧🇦', 'BB': '🇧🇧', 'Barbados': '🇧🇧',
    'BD': '🇧🇩', 'Bangladesh': '🇧🇩', 'BE': '🇧🇪', 'Belgium': '🇧🇪', 'BF': '🇧🇫', 'Burkina Faso': '🇧🇫',
    'BG': '🇧🇬', 'Bulgaria': '🇧🇬', 'BH': '🇧🇭', 'Bahrain': '🇧🇭', 'BI': '🇧🇮', 'Burundi': '🇧🇮',
    'BJ': '🇧🇯', 'Benin': '🇧🇯', 'BL': '🇧🇱', 'Saint Barthélemy': '🇧🇱', 'BM': '🇧🇲', 'Bermuda': '🇧🇲',
    'BN': '🇧🇳', 'Brunei Darussalam': '🇧🇳', 'BO': '🇧🇴', 'Bolivia': '🇧🇴', 'BQ': '🇧🇶', 'Bonaire, Sint Eustatius and Saba': '🇧🇶',
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
  return '🌐'; // Default globe if no match
}

// ===== TIKTOK USER LOOKUP FUNCTIONALITY (for index.html) ===== //
const getResultsBtn = document.getElementById('getResultsBtn');
const supportBtn = document.getElementById('supportBtn');
const usernameInput = document.getElementById('username'); // Changed from usernameInputGlobal
const resultDiv = document.getElementById('result'); // Main result div on index.html

if (getResultsBtn) getResultsBtn.addEventListener('click', lookupUser);
if (supportBtn) supportBtn.addEventListener('click', () => window.open('https://ko-fi.com/moroccan', '_blank'));

function lookupUser() {
  // Ensure elements are present on the page (primarily for index.html)
  if (!usernameInput || !resultDiv || !getResultsBtn) {
    console.warn("LookupUser called on a page without necessary elements (username input, result div, or getResults button).");
    return;
  }

  const username = usernameInput.value.trim();

  if (!username) {
    resultDiv.innerHTML = '<div class="message error-message">Please enter a valid TikTok username.</div>';
    resultDiv.style.display = 'block'; // Make sure #result is visible
    return;
  }

  getResultsBtn.disabled = true;
  resultDiv.innerHTML = '<div class="loading-spinner-container"><div class="loading-spinner"></div> Loading profile data...</div>';
  resultDiv.style.display = 'block'; // Make sure #result is visible

  const targetApiUrl = `https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-67a396e1-78e9-4dff-8f6a-0f07c2d80c56/default/sm-t/?username=${encodeURIComponent(username)}`;
  const apiUrl = `https://corsproxy.io/?${encodeURIComponent(targetApiUrl)}`;
  console.log("Attempting to fetch data via CORS proxy from:", apiUrl);

  fetch(apiUrl)
    .then(response => {
      console.log("Received response status:", response.status);
      if (!response.ok) {
        return response.text().then(text => {
            let errorMsg = `API request failed with status ${response.status}`;
            if (response.status === 429) errorMsg = 'Rate limit exceeded. Please try again later.';
            else if (response.status === 404) errorMsg = 'User not found or API endpoint issue.';
            else if (response.status === 503 && text.toLowerCase().includes("corsproxy.io")) errorMsg = 'The CORS proxy service might be temporarily unavailable or rate-limiting. Please try again shortly.';
            else {
                try { const errData = JSON.parse(text); errorMsg = errData.message || errData.error || text || errorMsg; }
                catch (e) { errorMsg = text || errorMsg; }
            }
            console.error("API Error:", errorMsg, "Raw text:", text);
            throw new Error(errorMsg);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Full API Response Data:", JSON.stringify(data, null, 2));
      const apiProfile = data.profile || data;

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
                console.log(`Found avatar URL using key: ${key}`);
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
                    console.log(`Skipping field with displayKey: ${displayKey} (original key: ${key})`);
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
             resultDiv.innerHTML = `<div class="message error-message">No displayable profile data found for '${sanitize(username)}'. The user might not exist, or the API returned minimal information.</div>`;
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
        console.warn("Profile data is missing, not an object, or empty in the API response.", "Received data:", data);
        resultDiv.innerHTML = `<div class="message error-message">Profile data not found or is incomplete for '${sanitize(username)}'. The API might be down, the user may not exist, or the response format is unexpected.</div>`;
      }
    })
    .catch(error => {
      console.error("Fetch or processing error:", error);
      resultDiv.innerHTML = `<div class="message error-message">Error: ${error.message || 'Failed to fetch profile data'}. Please check the username and try again. The API service or CORS proxy might be temporarily unavailable.</div>`;
    })
    .finally(() => {
      getResultsBtn.disabled = false;
    });
}

// Add event listener for Enter key on username input (specific to index.html)
if (usernameInput) { // Guard this listener as well
  usernameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (typeof lookupUser === 'function') { // Ensure lookupUser is defined
          lookupUser();
      }
    }
  });
}

// ===== INITIALIZATION ON DOM CONTENT LOADED ===== //
document.addEventListener('DOMContentLoaded', function() {
    // Show the main application content wrapper
    const appWrapper = document.getElementById('app-wrapper');
    if (appWrapper) {
        // The #app-wrapper in HTML is set to display:flex, flex-direction:column, align-items:center
        // So, we restore its intended display type.
        appWrapper.style.display = 'flex';
    }

    // Ensure the script error message is hidden if the script loads successfully
    const scriptErrorMsg = document.getElementById('script-error-message');
    if (scriptErrorMsg) {
        scriptErrorMsg.style.display = 'none';
    }

    // Initialize theme (globally applicable)
    if (typeof initializeTheme === 'function') {
        initializeTheme();
    }

    // Other initializations can be guarded here if needed,
    // though most event listeners above are already guarded.
    // For example, if there were functions to run only on specific pages:
    // if (document.getElementById('some-index-only-element')) {
    //     initializeIndexPageSpecificStuff();
    // }
    // if (document.getElementById('some-contact-only-element')) {
    //     initializeContactPageSpecificStuff();
    // }
});

// ===== CUSTOM ALERT FUNCTIONALITY (Used by Contact Form, potentially other features) ===== //
const customAlertOverlay = document.getElementById('customAlertOverlay');
const customAlertMessageEl = document.getElementById('customAlertMessage'); // Renamed to avoid conflict
const customAlertCloseBtn = document.getElementById('customAlertClose'); // Renamed to avoid conflict

function showAlert(message) {
    if (customAlertMessageEl && customAlertOverlay) {
        customAlertMessageEl.textContent = message;
        customAlertOverlay.classList.add('active');
    } else {
        // Fallback to console if custom alert elements aren't on the page
        console.warn("Custom alert elements not found. Alert message:", message);
        // As a last resort, use browser's alert, but it's generally discouraged.
        // window.alert(message);
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
