/**
 *  Returns capitalized firts letter of the string
 *
 * @param {string} string - The desired string
 * @return {string} - capitalized firts letter of the string
 */
export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
    return a === b;
}
export function camelCaseToDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map((key) => `${camelCaseToDashCase(key)}: ${styles[key]}`)
        .join(';');
}
export function debounce(fn, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            fn(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function removeTextSelection() {
    window.getSelection().removeAllRanges();
}
