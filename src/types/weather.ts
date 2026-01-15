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
 * Weather condition from OpenWeatherMap API
 */
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

/**
 * Main weather data from OpenWeatherMap API
 */
export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

/**
 * Wind data from OpenWeatherMap API
 */
export interface WindData {
  speed: number;
  deg: number;
}

/**
 * Complete weather response from OpenWeatherMap API
 */
export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
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
