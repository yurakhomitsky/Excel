/**
 * @class Dom
 * @classdesc Analog JQuery. Represent method for DOM manipulation
 */
class Dom {
  constructor(selector) {
    this.$element =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  /**
   * Set up innerHTML for element
   * @param {string} html - The HTML of element
   * @return {string | this} - This of Dom or trimmed HTML of element
   * @memberof Dom
   */
  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html;
      return this;
    }
    return this.$element.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this.$element.textContent = text;
      return this;
    }
    if (this.$element.tagName.toLowerCase() === 'input') {
      return this.$element.value.trim();
    }
    return this.$element.textContent.trim();
    
  }

  clear() {
    this.html('');
    return this;
  }

  /**
   * Add event listener on element
   *
   * @param {string} eventType - Type of event
   * @param {function} callback - Function for eventListener
   * @memberof Dom
   */
  on(eventType, callback) {
    this.$element.addEventListener(eventType,callback);
  }
/**
   * Removes event listener from element
   *
   * @param {string} eventType - Type of event
   * @param {function} callback - Function for eventListener
   * @memberof Dom
   */
  off(eventType, callback) {
    this.$element.removeEventListener(eventType,callback);
  }

  /**
   * Append node for element
   * @param {Element} elementNode - HTML node element
   * @return {this} - This of Dom
   * @memberof Dom
   */
  append(elementNode) {
    if (elementNode instanceof Dom) {
      elementNode = elementNode.$element;
    }
    if (Element.prototype.append) {
      this.$element.append(elementNode);
    } else {
      this.$element.appendChild(elementNode);
    }
    return this;
  }

  get data() {
    return this.$element.dataset;
  }

  closest(selector) {
    return $(this.$element.closest(selector));
  }
  
  getCoords() {
    return this.$element.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$element.querySelector(selector));
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector)
  }

  addClass(className) {
    this.$element.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$element.classList.remove(className);
    return this;
  }

  focus() {
    this.$element.focus();
    return this;
  }

  id(parse = false) { 
    if (parse) {
      const parsed = this.data.id.split(':');
      return {
          row: +parsed[0],
          col: +parsed[1],
      }
    }
    return this.data.id;
  }


  css(styles = {}) {
    Object.entries(styles).forEach(([key,value]) => {

        this.$element.style[key] = value
      
    });
  }
}

export function $(selector) {
  return new Dom(selector);
}

/**
 * Create HTML Element.
 * @param {string} tagName The tag name html element.
 * @param {string} classes The class name for html element.
 * @return {HTMLElement} The sum of the two numbers.
 */
$.create = function (tagName, classes = '') {
  const element = document.createElement(tagName);
  if (classes) {
    element.classList.add(classes);
  }
  return $(element);
};
