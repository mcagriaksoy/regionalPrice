const wageData = [
    { country: 'Turkey', wage: 501.6 },
    { country: 'UK', wage: 1952.7 },
    { country: 'Switzerland', wage: 4215.55 },
    { country: 'Australia', wage: 2461.53 },
    { country: 'New Zealand', wage: 2452.02 },
    { country: 'Luxembourg', wage: 2438.65 },
    { country: 'Belgium', wage: 1942.04 },
    { country: 'Ireland', wage: 1870.59 },
    { country: 'Netherlands', wage: 1851.3 },
    { country: 'Germany', wage: 1838.44 },
    { country: 'France', wage: 1734.69 },
    { country: 'San Marino', wage: 1680.88 },
    { country: 'Israel', wage: 1640.77 },
    { country: 'South Korea', wage: 1593.14 },
    { country: 'Japan', wage: 1468.73 },
    { country: 'USA', wage: 1256.67 },
    { country: 'Spain', wage: 1229.84 },
    { country: 'Slovenia', wage: 1132.61 },
    { country: 'Cyprus', wage: 917.11 },
    { country: 'The Bahamas', wage: 910 },
    { country: 'Greece', wage: 876.87 },
    { country: 'Portugal', wage: 867.04 },
    { country: 'Oman', wage: 845.25 },
    { country: 'Malta', wage: 835.16 },
    { country: 'Lithuania', wage: 769.53 },
    { country: 'Barbados', wage: 736.67 },
    { country: 'Palau', wage: 728 },
    { country: 'Estonia', wage: 689.41 },
    { country: 'Slovakia', wage: 680.98 },
    { country: 'Iran', wage: 632.26 },
    { country: 'Antigua and Barbuda', wage: 631.7 },
    { country: 'Marshall Islands', wage: 624 },
    { country: 'Dominica', wage: 577.78 },
    { country: 'Saint Kitts and Nevis', wage: 577.78 },
    { country: 'Montenegro', wage: 561.38 },
    { country: 'Trinidad and Tobago', wage: 538.58 },
    { country: 'Latvia', wage: 527.07 },
    { country: 'Argentina', wage: 482.64 },
    { country: 'Seychelles', wage: 465.4 },
    { country: 'Serbia', wage: 423.64 },
    { country: 'Saint Vincent and the Grenadines', wage: 385.19 },
    { country: 'Jordan', wage: 366.2 },
    { country: 'Guatemala', wage: 365.26 },
    { country: 'Grenada', wage: 337.04 },
    { country: 'Fiji', wage: 329.48 },
    { country: 'Libya', wage: 321.83 },
    { country: 'Belize', wage: 321.75 },
    { country: 'Morocco', wage: 314.7 },
    { country: 'Albania', wage: 282.48 },
    { country: 'Qatar', wage: 274.73 },
    { country: 'Gabon', wage: 270.5 },
    { country: 'Thailand', wage: 249.2 },
    { country: 'Kuwait', wage: 248.64 },
    { country: 'Iraq', wage: 241.38 },
    { country: 'Peru', wage: 239.66 },
    { country: 'Ukraine', wage: 212.72 },
    { country: 'Russia', wage: 212.6 },
    { country: 'Guyana', wage: 211.99 },
    { country: 'Equatorial Guinea', wage: 211.54 },
    { country: 'Papua New Guinea', wage: 207.48 },
    { country: 'Solomon Islands', wage: 204.58 },
    { country: 'Kiribati', wage: 203.12 },
    { country: 'Cambodia', wage: 194 },
    { country: 'Suriname', wage: 181.97 },
    { country: 'Belarus', wage: 178.78 },
    { country: 'Azerbaijan', wage: 176.47 },
    { country: 'Indonesia', wage: 174.96 },
    { country: 'Vietnam', wage: 168.26 },
    { country: 'Armenia', wage: 153.22 },
    { country: 'Philippines', wage: 148.86 },
    { country: 'Mongolia', wage: 147.41 },
    { country: 'Haiti', wage: 145.7 },
    { country: 'Algeria', wage: 140.14 },
    { country: 'Cape Verde', wage: 139.46 },
    { country: 'Comoros', wage: 132.23 },
    { country: 'Kenya', wage: 130.57 },
    { country: 'Nepal', wage: 126.97 },
    { country: 'Pakistan', wage: 116.63 },
    { country: 'East Timor', wage: 115 },
    { country: 'Mozambique', wage: 113.8 },
    { country: 'Lesotho', wage: 109.62 },
    { country: 'Chad', wage: 108.2 },
    { country: 'Kazakhstan', wage: 99.79 },
    { country: 'Democratic Republic of the Congo', wage: 92.47 },
    { country: 'Myanmar', wage: 90.33 },
    { country: 'Senegal', wage: 88.39 },
    { country: 'Uzbekistan', wage: 83.5 },
    { country: 'Afghanistan', wage: 71.6 },
    { country: 'Angola', wage: 71.17 },
    { country: 'Sierra Leone', wage: 65.87 },
    { country: 'Central African Republic', wage: 63.12 },
    { country: 'Bhutan', wage: 62.82 },
    { country: 'India', wage: 62.61 },
    { country: 'Tanzania', wage: 61.48 },
    { country: 'Togo', wage: 56.25 },
    { country: 'Ghana', wage: 56.11 },
    { country: 'Niger', wage: 54.18 },
    { country: 'Tajikistan', wage: 52.46 },
    { country: 'Malawi', wage: 46.7 },
    { country: 'Sri Lanka', wage: 39.75 },
    { country: 'Guinea-Bissau', wage: 34.32 },
    { country: 'Eswatini', wage: 28.41 },
    { country: 'The Gambia', wage: 25.25 },
    { country: 'Kyrgyzstan', wage: 21.9 },
    { country: 'Bangladesh', wage: 16.58 },
    { country: 'Georgia', wage: 6.21 },
    { country: 'Rwanda', wage: 2.54 },
    { country: 'Uganda', wage: 1.63 }
];

// Country name to ISO code map for flags
const isoMap = {
    'Estonia': 'ee', 'Australia': 'au', 'Turkey': 'tr', 'Germany': 'de', 'USA': 'us', 'France': 'fr', 'UK': 'gb', 'Russia': 'ru', 'Japan': 'jp', 'Guyana': 'gy',
    'New Zealand': 'nz', 'Luxembourg': 'lu', 'Belgium': 'be', 'Ireland': 'ie', 'Netherlands': 'nl', 'San Marino': 'sm', 'Israel': 'il', 'South Korea': 'kr',
    'Spain': 'es', 'Slovenia': 'si', 'Cyprus': 'cy', 'The Bahamas': 'bs', 'Greece': 'gr', 'Portugal': 'pt', 'Oman': 'om', 'Malta': 'mt', 'Lithuania': 'lt',
    'Barbados': 'bb', 'Palau': 'pw', 'Slovakia': 'sk', 'Iran': 'ir', 'Antigua and Barbuda': 'ag', 'Marshall Islands': 'mh', 'Dominica': 'dm',
    'Saint Kitts and Nevis': 'kn', 'Montenegro': 'me', 'Trinidad and Tobago': 'tt', 'Latvia': 'lv', 'Argentina': 'ar', 'Seychelles': 'sc', 'Serbia': 'rs',
    'Saint Vincent and the Grenadines': 'vc', 'Jordan': 'jo', 'Guatemala': 'gt', 'Grenada': 'gd', 'Fiji': 'fj', 'Libya': 'ly', 'Belize': 'bz',
    'Morocco': 'ma', 'Albania': 'al', 'Qatar': 'qa', 'Gabon': 'ga', 'Thailand': 'th', 'Kuwait': 'kw', 'Iraq': 'iq', 'Peru': 'pe', 'Ukraine': 'ua',
    'Russia': 'ru', 'Guyana': 'gy', 'Equatorial Guinea': 'gq', 'Papua New Guinea': 'pg', 'Solomon Islands': 'sb', 'Kiribati': 'ki', 'Cambodia': 'kh',
    'Suriname': 'sr', 'Belarus': 'by', 'Azerbaijan': 'az', 'Indonesia': 'id', 'Vietnam': 'vn', 'Armenia': 'am', 'Philippines': 'ph', 'Mongolia': 'mn',
    'Haiti': 'ht', 'Algeria': 'dz', 'Cape Verde': 'cv', 'Comoros': 'km', 'Kenya': 'ke', 'Nepal': 'np', 'Pakistan': 'pk', 'East Timor': 'tl',
    'Mozambique': 'mz', 'Lesotho': 'ls', 'Chad': 'td', 'Kazakhstan': 'kz', 'Democratic Republic of the Congo': 'cd', 'Myanmar': 'mm', 'Senegal': 'sn',
    'Uzbekistan': 'uz', 'Afghanistan': 'af', 'Angola': 'ao', 'Sierra Leone': 'sl', 'Central African Republic': 'cf', 'Bhutan': 'bt', 'India': 'in',
    'Tanzania': 'tz', 'Togo': 'tg', 'Ghana': 'gh', 'Niger': 'ne', 'Tajikistan': 'tj', 'Malawi': 'mw', 'Sri Lanka': 'lk', 'Guinea-Bissau': 'gw',
    'Eswatini': 'sz', 'The Gambia': 'gm', 'Kyrgyzstan': 'kg', 'Bangladesh': 'bd', 'Georgia': 'ge', 'Rwanda': 'rw', 'Uganda': 'ug'
};