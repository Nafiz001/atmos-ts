/**
 * Weather Service - Handles all API interactions with OpenWeatherMap
 */

import type { WeatherResponse, WeatherData, WeatherError } from '../types/weather.js';

/**
 * OpenWeatherMap API Configuration
 */
const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: 'YOUR_API_KEY_HERE', // Replace with your actual API key
  DEFAULT_UNITS: 'metric',
} as const;

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
 * Fetch weather data from OpenWeatherMap API
 */
async function fetchWeatherFromAPI(city: string): Promise<WeatherResponse> {
  const url = `${API_CONFIG.BASE_URL}/weather?q=${encodeURIComponent(
    city
  )}&units=${API_CONFIG.DEFAULT_UNITS}&appid=${API_CONFIG.API_KEY}`;

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
    city: response.name,
    country: response.sys.country,
    temperature: response.main.temp,
    feelsLike: response.main.feels_like,
    condition: response.weather[0].main,
    description: response.weather[0].description,
    humidity: response.main.humidity,
    windSpeed: response.wind.speed,
    icon: response.weather[0].icon,
    timestamp: response.dt,
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

  if (API_CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
    throw new WeatherServiceError(
      'API key not configured. Please add your OpenWeatherMap API key.',
      'MISSING_API_KEY'
    );
  }

  const response = await fetchWeatherFromAPI(city.trim());
  return transformWeatherResponse(response);
}

/**
 * Validate if the API key is configured
 */
export function isAPIKeyConfigured(): boolean {
  return API_CONFIG.API_KEY !== 'YOUR_API_KEY_HERE';
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof WeatherServiceError) {
    if (error.code === '404') {
      return 'City not found. Please check the spelling and try again.';
    }
    if (error.code === '401') {
      return 'Invalid API key. Please check your configuration.';
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
