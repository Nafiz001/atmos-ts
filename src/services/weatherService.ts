/**
 * Weather Service - Handles all API interactions with WeatherAPI.com
 */

import type { WeatherResponse, WeatherData, WeatherError } from '../types/weather.js';
import { config } from '../config.js';

/**
 * WeatherAPI.com API Configuration
 */
const API_CONFIG = {
  BASE_URL: 'https://api.weatherapi.com/v1',
  API_KEY: config.weatherApiKey,
  DEFAULT_UNITS: 'metric',
}

/**
 * Custom error class for weather service errors
 */
export class WeatherServiceError extends Error {
  constructor(
    message: string,
    public readonly code?: string | number
  ) {
    super(message);
    this.name = 'WeatherServiceError';
  }
}

/**
 * Fetch weather data from WeatherAPI.com
 */
async function fetchWeatherFromAPI(city: string): Promise<WeatherResponse> {
  const url = `${API_CONFIG.BASE_URL}/current.json?key=${API_CONFIG.API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Try to parse error response
      const errorData: WeatherError = await response.json();
      throw new WeatherServiceError(
        errorData.message || 'Failed to fetch weather data',
        errorData.cod
      );
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherServiceError) {
      throw error;
    }

    // Network or parsing error
    if (error instanceof Error) {
      throw new WeatherServiceError(
        `Network error: ${error.message}`,
        'NETWORK_ERROR'
      );
    }

    throw new WeatherServiceError('An unknown error occurred', 'UNKNOWN_ERROR');
  }
}

/**
 * Transform API response to our application's WeatherData format
 */
function transformWeatherResponse(response: WeatherResponse): WeatherData {
  return {
    city: response.location.name,
    country: response.location.country,
    temperature: response.current.temp_c,
    feelsLike: response.current.feelslike_c,
    condition: response.current.condition.text,
    description: response.current.condition.text,
    humidity: response.current.humidity,
    windSpeed: response.current.wind_kph / 3.6, // Convert km/h to m/s
    icon: response.current.condition.icon.replace('//', 'https://'),
    timestamp: response.current.last_updated_epoch,
  };
}

/**
 * Get weather data for a city
 * @param city - The city name to search for
 * @returns Processed weather data
 * @throws WeatherServiceError if the request fails
 */
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  if (!city || city.trim().length === 0) {
    throw new WeatherServiceError('City name cannot be empty', 'INVALID_INPUT');
  }

  const response = await fetchWeatherFromAPI(city.trim());
  return transformWeatherResponse(response);
}

/**
 * Validate if the API key is configured
 */
export function isAPIKeyConfigured(): boolean {
  return API_CONFIG.API_KEY.length > 0;
}

/**
 * Search for cities using WeatherAPI.com Search/Autocomplete API
 */
export async function searchCities(query: string): Promise<Array<{
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}>> {
  if (!query || query.length < 2) {
    return [];
  }

  const url = `${API_CONFIG.BASE_URL}/search.json?key=${API_CONFIG.API_KEY}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('City search error:', error);
    return [];
  }
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof WeatherServiceError) {
    if (error.code === 1006 || error.code === '1006') {
      return 'City not found. Please check the spelling and try again.';
    }
    if (error.code === 2006 || error.code === '2006') {
      return 'Invalid API key. Please check your configuration.';
    }
    if (error.code === 1002 || error.code === '1002') {
      return 'API key not provided. Please check your configuration.';
    }
    if (error.code === 'NETWORK_ERROR') {
      return 'Network error. Please check your internet connection.';
    }
    if (error.code === 'MISSING_API_KEY') {
      return error.message;
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}
