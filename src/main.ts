/**
 * Atmos - Main Application Entry Point
 * A Vanilla TypeScript Weather Application
 */

import type { TemperatureUnit, Theme, AppState } from './types/weather.js';
import { getWeatherByCity, getErrorMessage } from './services/weatherService.js';
import { WeatherCard } from './components/WeatherCard.js';
import { getElement, toggleClass } from './utils/dom.js';

/**
 * Local Storage Keys
 */
const STORAGE_KEYS = {
  LAST_CITY: 'atmos_last_city',
  TEMPERATURE_UNIT: 'atmos_temperature_unit',
  THEME: 'atmos_theme',
} as const;

/**
 * Main Application Class
 */
class AtmosApp {
  private weatherCard: WeatherCard;
  private searchInput: HTMLInputElement;
  private searchButton: HTMLButtonElement;
  private unitToggle: HTMLButtonElement;
  private themeToggle: HTMLButtonElement;
  private state: AppState;

  constructor() {
    // Initialize state
    this.state = {
      currentWeather: null,
      temperatureUnit: this.loadTemperatureUnit(),
      theme: this.loadTheme(),
      lastSearchedCity: this.loadLastCity(),
      isLoading: false,
      error: null,
    };

    // Initialize components
    this.weatherCard = new WeatherCard('weather-display');

    // Get DOM elements
    this.searchInput = getElement<HTMLInputElement>('city-input');
    this.searchButton = getElement<HTMLButtonElement>('search-button');
    this.unitToggle = getElement<HTMLButtonElement>('unit-toggle');
    this.themeToggle = getElement<HTMLButtonElement>('theme-toggle');

    // Setup event listeners
    this.setupEventListeners();

    // Apply initial theme
    this.applyTheme(this.state.theme);

    // Update unit toggle button text
    this.updateUnitToggleButton();

    // Load last searched city if available
    if (this.state.lastSearchedCity) {
      this.searchInput.value = this.state.lastSearchedCity;
      this.searchWeather(this.state.lastSearchedCity);
    }
  }

  /**
   * Setup all event listeners
   */
  private setupEventListeners(): void {
    // Search button click
    this.searchButton.addEventListener('click', () => {
      this.handleSearch();
    });

    // Enter key in search input
    this.searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    });

    // Temperature unit toggle
    this.unitToggle.addEventListener('click', () => {
      this.toggleTemperatureUnit();
    });

    // Theme toggle
    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  /**
   * Handle search action
   */
  private handleSearch(): void {
    const city = this.searchInput.value.trim();

    if (!city) {
      this.weatherCard.showError('Please enter a city name');
      return;
    }

    this.searchWeather(city);
  }

  /**
   * Search weather for a city
   */
  private async searchWeather(city: string): Promise<void> {
    try {
      // Update state
      this.state.isLoading = true;
      this.state.error = null;

      // Show loading state
      this.weatherCard.showLoading();

      // Disable search button
      this.searchButton.disabled = true;
      this.searchButton.textContent = 'Searching...';

      // Fetch weather data
      const weatherData = await getWeatherByCity(city);

      // Update state
      this.state.currentWeather = weatherData;
      this.state.lastSearchedCity = city;
      this.state.isLoading = false;

      // Save to localStorage
      this.saveLastCity(city);

      // Render weather data
      this.weatherCard.render(weatherData);
      this.weatherCard.updateTemperatureUnit(this.state.temperatureUnit);
    } catch (error) {
      // Handle error
      this.state.isLoading = false;
      this.state.error = getErrorMessage(error);

      // Show error
      this.weatherCard.showError(this.state.error);
    } finally {
      // Re-enable search button
      this.searchButton.disabled = false;
      this.searchButton.textContent = 'Search';
    }
  }

  /**
   * Toggle temperature unit
   */
  private toggleTemperatureUnit(): void {
    this.state.temperatureUnit =
      this.state.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';

    // Save to localStorage
    this.saveTemperatureUnit(this.state.temperatureUnit);

    // Update display
    this.weatherCard.updateTemperatureUnit(this.state.temperatureUnit);
    this.updateUnitToggleButton();
  }

  /**
   * Update unit toggle button text
   */
  private updateUnitToggleButton(): void {
    const symbol = this.state.temperatureUnit === 'celsius' ? '°F' : '°C';
    this.unitToggle.textContent = `Switch to ${symbol}`;
  }

  /**
   * Toggle theme
   */
  private toggleTheme(): void {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.state.theme);
    this.saveTheme(this.state.theme);
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  /**
   * Load last searched city from localStorage
   */
  private loadLastCity(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LAST_CITY);
  }

  /**
   * Save last searched city to localStorage
   */
  private saveLastCity(city: string): void {
    localStorage.setItem(STORAGE_KEYS.LAST_CITY, city);
  }

  /**
   * Load temperature unit from localStorage
   */
  private loadTemperatureUnit(): TemperatureUnit {
    const stored = localStorage.getItem(STORAGE_KEYS.TEMPERATURE_UNIT);
    return stored === 'fahrenheit' ? 'fahrenheit' : 'celsius';
  }

  /**
   * Save temperature unit to localStorage
   */
  private saveTemperatureUnit(unit: TemperatureUnit): void {
    localStorage.setItem(STORAGE_KEYS.TEMPERATURE_UNIT, unit);
  }

  /**
   * Load theme from localStorage
   */
  private loadTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    // Default to light theme or use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new AtmosApp();
});
