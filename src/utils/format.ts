/**
 * Formatting utility functions for weather data
 */

import type { TemperatureUnit } from '../types/weather.js';

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Format temperature with unit symbol
 */
export function formatTemperature(
  temp: number,
  unit: TemperatureUnit,
  decimals: number = 1
): string {
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(temp) : temp;
  const symbol = unit === 'fahrenheit' ? '°F' : '°C';
  return `${value.toFixed(decimals)}${symbol}`;
}

/**
 * Format wind speed with unit
 */
export function formatWindSpeed(speed: number): string {
  return `${speed.toFixed(1)} m/s`;
}

/**
 * Format humidity percentage
 */
export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get OpenWeatherMap icon URL
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * Format timestamp to readable date/time
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
