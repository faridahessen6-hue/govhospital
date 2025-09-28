/**
 * Core DOM Utilities
 * Centralized DOM manipulation functions
 */

export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

export const createElement = (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            element.setAttribute(key, value);
        }
    });
    
    // Append children
    if (Array.isArray(children)) {
        children.forEach(child => {
            if (child instanceof Node) {
                element.appendChild(child);
            } else if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            }
        });
    }
    
    return element;
};

export const removeAllChildren = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

export const toggleClass = (element, className, force) => {
    if (element) {
        element.classList.toggle(className, force);
    }
};

export const on = (element, event, handler, options) => {
    element?.addEventListener(event, handler, options);
    return () => element?.removeEventListener(event, handler, options);
};

export const delegate = (parent, selector, event, handler) => {
    return on(parent, event, (e) => {
        if (e.target.matches(selector)) {
            handler(e);
        }
    });
};
