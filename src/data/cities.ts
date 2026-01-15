/**
 * City data for autocomplete suggestions
 */

export interface City {
  name: string;
  country: string;
  countryCode: string;
}

/**
 * Popular cities worldwide for autocomplete
 */
export const POPULAR_CITIES: City[] = [
  // United States
  { name: 'New York', country: 'United States', countryCode: 'US' },
  { name: 'Los Angeles', country: 'United States', countryCode: 'US' },
  { name: 'Chicago', country: 'United States', countryCode: 'US' },
  { name: 'Houston', country: 'United States', countryCode: 'US' },
  { name: 'Phoenix', country: 'United States', countryCode: 'US' },
  { name: 'Philadelphia', country: 'United States', countryCode: 'US' },
  { name: 'San Antonio', country: 'United States', countryCode: 'US' },
  { name: 'San Diego', country: 'United States', countryCode: 'US' },
  { name: 'Dallas', country: 'United States', countryCode: 'US' },
  { name: 'San Jose', country: 'United States', countryCode: 'US' },
  { name: 'Austin', country: 'United States', countryCode: 'US' },
  { name: 'Miami', country: 'United States', countryCode: 'US' },
  { name: 'Seattle', country: 'United States', countryCode: 'US' },
  { name: 'Boston', country: 'United States', countryCode: 'US' },
  { name: 'Las Vegas', country: 'United States', countryCode: 'US' },
  
  // United Kingdom
  { name: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { name: 'Manchester', country: 'United Kingdom', countryCode: 'GB' },
  { name: 'Birmingham', country: 'United Kingdom', countryCode: 'GB' },
  { name: 'Liverpool', country: 'United Kingdom', countryCode: 'GB' },
  { name: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB' },
  
  // Europe
  { name: 'Paris', country: 'France', countryCode: 'FR' },
  { name: 'Berlin', country: 'Germany', countryCode: 'DE' },
  { name: 'Madrid', country: 'Spain', countryCode: 'ES' },
  { name: 'Rome', country: 'Italy', countryCode: 'IT' },
  { name: 'Amsterdam', country: 'Netherlands', countryCode: 'NL' },
  { name: 'Barcelona', country: 'Spain', countryCode: 'ES' },
  { name: 'Vienna', country: 'Austria', countryCode: 'AT' },
  { name: 'Prague', country: 'Czech Republic', countryCode: 'CZ' },
  { name: 'Brussels', country: 'Belgium', countryCode: 'BE' },
  { name: 'Stockholm', country: 'Sweden', countryCode: 'SE' },
  { name: 'Copenhagen', country: 'Denmark', countryCode: 'DK' },
  { name: 'Oslo', country: 'Norway', countryCode: 'NO' },
  { name: 'Helsinki', country: 'Finland', countryCode: 'FI' },
  { name: 'Zurich', country: 'Switzerland', countryCode: 'CH' },
  { name: 'Warsaw', country: 'Poland', countryCode: 'PL' },
  { name: 'Budapest', country: 'Hungary', countryCode: 'HU' },
  { name: 'Athens', country: 'Greece', countryCode: 'GR' },
  { name: 'Lisbon', country: 'Portugal', countryCode: 'PT' },
  { name: 'Dublin', country: 'Ireland', countryCode: 'IE' },
  { name: 'Moscow', country: 'Russia', countryCode: 'RU' },
  
  // Asia
  { name: 'Tokyo', country: 'Japan', countryCode: 'JP' },
  { name: 'Beijing', country: 'China', countryCode: 'CN' },
  { name: 'Shanghai', country: 'China', countryCode: 'CN' },
  { name: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK' },
  { name: 'Singapore', country: 'Singapore', countryCode: 'SG' },
  { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE' },
  { name: 'Bangkok', country: 'Thailand', countryCode: 'TH' },
  { name: 'Seoul', country: 'South Korea', countryCode: 'KR' },
  { name: 'Mumbai', country: 'India', countryCode: 'IN' },
  { name: 'Delhi', country: 'India', countryCode: 'IN' },
  { name: 'Bangalore', country: 'India', countryCode: 'IN' },
  { name: 'Jakarta', country: 'Indonesia', countryCode: 'ID' },
  { name: 'Manila', country: 'Philippines', countryCode: 'PH' },
  { name: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY' },
  { name: 'Tel Aviv', country: 'Israel', countryCode: 'IL' },
  { name: 'Istanbul', country: 'Turkey', countryCode: 'TR' },
  { name: 'Dhaka', country: 'Bangladesh', countryCode: 'BD' },
  
  // Australia & Oceania
  { name: 'Sydney', country: 'Australia', countryCode: 'AU' },
  { name: 'Melbourne', country: 'Australia', countryCode: 'AU' },
  { name: 'Brisbane', country: 'Australia', countryCode: 'AU' },
  { name: 'Perth', country: 'Australia', countryCode: 'AU' },
  { name: 'Auckland', country: 'New Zealand', countryCode: 'NZ' },
  
  // South America
  { name: 'São Paulo', country: 'Brazil', countryCode: 'BR' },
  { name: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR' },
  { name: 'Buenos Aires', country: 'Argentina', countryCode: 'AR' },
  { name: 'Lima', country: 'Peru', countryCode: 'PE' },
  { name: 'Bogotá', country: 'Colombia', countryCode: 'CO' },
  { name: 'Santiago', country: 'Chile', countryCode: 'CL' },
  
  // Africa
  { name: 'Cairo', country: 'Egypt', countryCode: 'EG' },
  { name: 'Lagos', country: 'Nigeria', countryCode: 'NG' },
  { name: 'Johannesburg', country: 'South Africa', countryCode: 'ZA' },
  { name: 'Cape Town', country: 'South Africa', countryCode: 'ZA' },
  { name: 'Nairobi', country: 'Kenya', countryCode: 'KE' },
  { name: 'Casablanca', country: 'Morocco', countryCode: 'MA' },
  
  // Canada
  { name: 'Toronto', country: 'Canada', countryCode: 'CA' },
  { name: 'Montreal', country: 'Canada', countryCode: 'CA' },
  { name: 'Vancouver', country: 'Canada', countryCode: 'CA' },
  { name: 'Calgary', country: 'Canada', countryCode: 'CA' },
  { name: 'Ottawa', country: 'Canada', countryCode: 'CA' },
  
  // Mexico
  { name: 'Mexico City', country: 'Mexico', countryCode: 'MX' },
  { name: 'Guadalajara', country: 'Mexico', countryCode: 'MX' },
  { name: 'Monterrey', country: 'Mexico', countryCode: 'MX' },
];

/**
 * Filter cities based on search query
 */
export function filterCities(query: string, maxResults: number = 5): City[] {
  if (!query || query.length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  // Find cities that match the search term
  const matches = POPULAR_CITIES.filter(city => {
    const cityName = city.name.toLowerCase();
    const countryName = city.country.toLowerCase();
    
    return cityName.startsWith(searchTerm) || 
           cityName.includes(searchTerm) ||
           countryName.startsWith(searchTerm);
  });

  // Sort by relevance (cities starting with search term come first)
  matches.sort((a, b) => {
    const aStarts = a.name.toLowerCase().startsWith(searchTerm);
    const bStarts = b.name.toLowerCase().startsWith(searchTerm);
    
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    
    return a.name.localeCompare(b.name);
  });

  return matches.slice(0, maxResults);
}
