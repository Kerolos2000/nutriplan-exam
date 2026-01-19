export class DOM {
  static query(selector, context = document) {
    return context.querySelector(selector);
  }

  static queryAll(selector, context = document) {
    return context.querySelectorAll(selector);
  }

  static on(element, event, handler, options = {}) {
    element?.addEventListener(event, handler, options);
  }

  static off(element, event, handler) {
    element?.removeEventListener(event, handler);
  }

  static setHTML(element, html) {
    if (element) element.innerHTML = html;
  }

  static setText(element, text) {
    if (element) element.textContent = text;
  }

  static addClass(element, ...classes) {
    element?.classList.add(...classes);
  }

  static removeClass(element, ...classes) {
    element?.classList.remove(...classes);
  }

  static toggleClass(element, className, force) {
    element?.classList.toggle(className, force);
  }

  static hasClass(element, className) {
    return element?.classList.contains(className) || false;
  }

  static setAttr(element, attr, value) {
    element?.setAttribute(attr, value);
  }

  static getAttr(element, attr) {
    return element?.getAttribute(attr);
  }

  static removeAttr(element, attr) {
    element?.removeAttribute(attr);
  }

  static getParent(element, selector) {
    return element?.closest(selector);
  }

  static delegate(parent, selector, event, handler) {
    this.on(parent, event, (e) => {
      if (e.target.matches(selector)) {
        handler.call(e.target, e);
      }
    });
  }
}
