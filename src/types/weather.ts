/**
 * Type definitions for OpenWeatherMap API responses and application data structures
 */

/**
 * Temperature unit type
 */
export type TemperatureUnit = 'celsius' | 'fahrenheit';

/**
 * Theme type for the application
 */
export type Theme = 'light' | 'dark';

/**
 * Weather condition from WeatherAPI.com
 */
export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

/**
 * Location data from WeatherAPI.com
 */
export interface LocationData {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

/**
 * Current weather data from WeatherAPI.com
 */
export interface CurrentWeatherData {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

/**
 * Complete weather response from WeatherAPI.com
 */
export interface WeatherResponse {
  location: LocationData;
  current: CurrentWeatherData;
}

/**
 * Processed weather data for display
 */
export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  timestamp: number;
}

/**
 * Error response from OpenWeatherMap API
 */
export interface WeatherError {
  cod: string | number;
  message: string;
}

/**
 * Application state
 */
export interface AppState {
  currentWeather: WeatherData | null;
  temperatureUnit: TemperatureUnit;
  theme: Theme;
  lastSearchedCity: string | null;
  isLoading: boolean;
  error: string | null;
}
