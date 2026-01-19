export class BaseComponent {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  update() {
    if (this.element) {
      const newElement = this.createElement(this.render());
      this.element.replaceWith(newElement);
      this.element = newElement;
      this.onMount();
    }
  }

  createElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  mount(container) {
    this.element = this.createElement(this.render());
    container.appendChild(this.element);
    this.onMount();
    return this.element;
  }

  onMount() {}

  render() {
    return "";
  }
}
