class Dom {
  constructor(selector) {
    this.$element =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

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

  on(eventType, callback) {
    this.$element.addEventListener(eventType,callback);
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType,callback);
  }

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
