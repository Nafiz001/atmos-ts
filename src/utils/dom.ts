/**
 * DOM utility functions for element selection and manipulation
 */

/**
 * Safely get an element by ID with type checking
 */
export function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" not found`);
  }
  return element as T;
}

/**
 * Safely query selector with type checking
 */
export function querySelector<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }
  return element as T;
}

/**
 * Add class to element
 */
export function addClass(element: HTMLElement, className: string): void {
  element.classList.add(className);
}

/**
 * Remove class from element
 */
export function removeClass(element: HTMLElement, className: string): void {
  element.classList.remove(className);
}

/**
 * Toggle class on element
 */
export function toggleClass(element: HTMLElement, className: string): void {
  element.classList.toggle(className);
}

/**
 * Show element by removing hidden class
 */
export function show(element: HTMLElement): void {
  element.style.display = '';
  removeClass(element, 'hidden');
}

/**
 * Hide element by adding hidden class
 */
export function hide(element: HTMLElement): void {
  element.style.display = 'none';
  addClass(element, 'hidden');
}

/**
 * Set text content of an element
 */
export function setText(element: HTMLElement, text: string): void {
  element.textContent = text;
}

/**
 * Set HTML content of an element
 */
export function setHTML(element: HTMLElement, html: string): void {
  element.innerHTML = html;
}

/**
 * Create an element with optional class names
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  classNames?: string[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (classNames) {
    classNames.forEach((className) => addClass(element, className));
  }
  return element;
}
