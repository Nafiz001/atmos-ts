/**
 * Autocomplete Component for City Search
 */

import { searchCities } from '../services/weatherService.js';
import { createElement, addClass, removeClass } from '../utils/dom.js';

interface City {
  name: string;
  country: string;
}

interface APICityResult {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

/**
 * Autocomplete Component
 */
export class Autocomplete {
  private input: HTMLInputElement;
  private container: HTMLElement;
  private suggestionsBox: HTMLElement | null = null;
  private selectedIndex: number = -1;
  private suggestions: APICityResult[] = [];
  private onSelectCallback?: (city: City) => void;
  private searchTimeout: number | null = null;

  constructor(inputElement: HTMLInputElement) {
    this.input = inputElement;
    this.container = inputElement.parentElement as HTMLElement;
    
    if (!this.container) {
      throw new Error('Input element must have a parent container');
    }

    this.init();
  }

  /**
   * Initialize autocomplete
   */
  private init(): void {
    // Create suggestions box
    this.suggestionsBox = createElement('div', ['autocomplete-suggestions']);
    this.container.appendChild(this.suggestionsBox);
    
    // Position the container relatively
    this.container.style.position = 'relative';

    // Setup event listeners
    this.setupEventListeners();
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // Input event for filtering
    this.input.addEventListener('input', () => {
      this.handleInput();
    });

    // Keyboard navigation
    this.input.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });

    // Close on click outside
    document.addEventListener('click', (event) => {
      if (!this.container.contains(event.target as Node)) {
        this.close();
      }
    });

    // Prevent form submission on enter when suggestions are open
    this.input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && this.selectedIndex >= 0) {
        event.preventDefault();
      }
    });
  }

  /**
   * Handle input changes with debounce
   */
  private handleInput(): void {
    const query = this.input.value;
    
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (query.length < 2) {
      this.close();
      return;
    }

    // Debounce API calls
    this.searchTimeout = window.setTimeout(async () => {
      await this.fetchSuggestions(query);
    }, 300);
  }

  /**
   * Fetch suggestions from API
   */
  private async fetchSuggestions(query: string): Promise<void> {
    try {
      this.suggestions = await searchCities(query);
      
      if (this.suggestions.length === 0) {
        this.close();
        return;
      }

      this.render();
    } catch (error) {
      console.error('Failed to fetch city suggestions:', error);
      this.close();
    }
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(
          this.selectedIndex + 1,
          this.suggestions.length - 1
        );
        this.updateSelection();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        this.updateSelection();
        break;

      case 'Enter':
        if (this.selectedIndex >= 0) {
          event.preventDefault();
          const selectedCity = this.suggestions[this.selectedIndex];
          const cityData: City = {
            name: selectedCity.name,
            country: selectedCity.country
          };
          this.selectSuggestion(cityData);
        }
        break;

      case 'Escape':
        this.close();
        break;
    }
  }

  /**
   * Render suggestions
   */
  private render(): void {
    if (!this.suggestionsBox) return;

    // Clear previous suggestions
    this.suggestionsBox.innerHTML = '';

    // Create suggestion items
    this.suggestions.forEach((city, index) => {
      const item = createElement('div', ['autocomplete-item']);
      
      const cityName = createElement('span', ['city-name']);
      cityName.textContent = city.name;
      
      const countryName = createElement('span', ['country-name']);
      countryName.textContent = city.region ? `${city.region}, ${city.country}` : city.country;
      
      const flag = createElement('span', ['country-flag']);
      flag.textContent = '📍';

      item.appendChild(flag);
      item.appendChild(cityName);
      item.appendChild(countryName);

      // Click handler
      item.addEventListener('click', () => {
        const cityData: City = {
          name: city.name,
          country: city.country
        };
        this.selectSuggestion(cityData);
      });

      // Hover handler
      item.addEventListener('mouseenter', () => {
        this.selectedIndex = index;
        this.updateSelection();
      });

      if (this.suggestionsBox) {
        this.suggestionsBox.appendChild(item);
      }
    });

    // Show suggestions box
    addClass(this.suggestionsBox, 'visible');
    this.selectedIndex = -1;
  }

  /**
   * Update visual selection
   */
  private updateSelection(): void {
    if (!this.suggestionsBox) return;

    const items = this.suggestionsBox.querySelectorAll('.autocomplete-item');
    
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        addClass(item as HTMLElement, 'selected');
      } else {
        removeClass(item as HTMLElement, 'selected');
      }
    });
  }

  /**
   * Select a suggestion
   */
  private selectSuggestion(city: City): void {
    this.input.value = city.name;
    this.close();
    
    if (this.onSelectCallback) {
      this.onSelectCallback(city);
    }
  }

  /**
   * Check if suggestions are open
   */
  private isOpen(): boolean {
    return this.suggestionsBox?.classList.contains('visible') || false;
  }

  /**
   * Close suggestions
   */
  public close(): void {
    if (this.suggestionsBox) {
      removeClass(this.suggestionsBox, 'visible');
    }
    this.selectedIndex = -1;
    this.suggestions = [];
  }

  /**
   * Set callback for when a city is selected
   */
  public onSelect(callback: (city: City) => void): void {
    this.onSelectCallback = callback;
  }

  /**
   * Destroy autocomplete
   */
  public destroy(): void {
    if (this.suggestionsBox) {
      this.suggestionsBox.remove();
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
}
