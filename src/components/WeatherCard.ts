/**
 * WeatherCard Component - Renders weather data in a card format
 */

import type { WeatherData, TemperatureUnit } from '../types/weather.js';
import {
  formatTemperature,
  formatWindSpeed,
  formatHumidity,
  capitalizeWords,
  getWeatherIconUrl,
} from '../utils/format.js';
import { setHTML, setText } from '../utils/dom.js';

/**
 * Weather Card Component Class
 */
export class WeatherCard {
  private container: HTMLElement;
  private temperatureUnit: TemperatureUnit = 'celsius';

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = element;
  }

  /**
   * Render weather data in the card
   */
  render(data: WeatherData): void {
    const html = `
      <div class="weather-card">
        <div class="weather-header">
          <h2 class="city-name">${data.city}, ${data.country}</h2>
        </div>
        
        <div class="weather-main">
          <div class="weather-icon-container">
            <img 
              src="${getWeatherIconUrl(data.icon)}" 
              alt="${data.description}"
              class="weather-icon"
            />
          </div>
          
          <div class="temperature-display">
            <span class="temperature" data-celsius="${data.temperature}">
              ${formatTemperature(data.temperature, this.temperatureUnit, 0)}
            </span>
          </div>
          
          <div class="weather-description">
            <p class="condition">${capitalizeWords(data.description)}</p>
          </div>
        </div>
        
        <div class="weather-details">
          <div class="detail-item">
            <span class="detail-label">Feels Like</span>
            <span class="detail-value feels-like" data-celsius="${data.feelsLike}">
              ${formatTemperature(data.feelsLike, this.temperatureUnit, 0)}
            </span>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">Humidity</span>
            <span class="detail-value">${formatHumidity(data.humidity)}</span>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">Wind Speed</span>
            <span class="detail-value">${formatWindSpeed(data.windSpeed)}</span>
          </div>
        </div>
      </div>
    `;

    setHTML(this.container, html);
  }

  /**
   * Update temperature unit and refresh display
   */
  updateTemperatureUnit(unit: TemperatureUnit): void {
    this.temperatureUnit = unit;

    // Update all temperature displays
    const temperatureElements = this.container.querySelectorAll<HTMLElement>(
      '[data-celsius]'
    );

    temperatureElements.forEach((element) => {
      const celsius = parseFloat(element.dataset.celsius || '0');
      const formatted = formatTemperature(
        celsius,
        unit,
        element.classList.contains('temperature') ? 0 : 0
      );
      setText(element, formatted);
    });
  }

  /**
   * Clear the weather card
   */
  clear(): void {
    setHTML(this.container, '');
  }

  /**
   * Show error message in the card
   */
  showError(message: string): void {
    const html = `
      <div class="weather-card error">
        <div class="error-icon">⚠️</div>
        <p class="error-message">${message}</p>
      </div>
    `;
    setHTML(this.container, html);
  }

  /**
   * Show loading state
   */
  showLoading(): void {
    const html = `
      <div class="weather-card loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">Fetching weather data...</p>
      </div>
    `;
    setHTML(this.container, html);
  }
}
