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
