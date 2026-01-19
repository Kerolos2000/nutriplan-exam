export class Route {
  constructor(pattern, pageFactory) {
    this.pattern = pattern;
    this.pageFactory = pageFactory;
  }

  match(path) {
    if (typeof this.pattern === "string") {
      return path === this.pattern;
    }
    if (this.pattern instanceof RegExp) {
      return this.pattern.test(path);
    }
    return false;
  }

  getParams(path) {
    if (this.pattern === "/" || this.pattern.test?.(path)) {
      const match = path.match(/\/meal\/(.+)/);
      return match ? { id: match[1] } : {};
    }
    return {};
  }

  createPage(path) {
    const params = this.getParams(path);
    return params.id ? this.pageFactory(params.id) : this.pageFactory();
  }
}
