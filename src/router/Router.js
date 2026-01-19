export class Router {
  constructor(routes) {
    this.routes = routes;
    this.init = this.init.bind(this);
    window.addEventListener("hashchange", this.init);
  }

  init() {
    const path = this.getPath();
    const matchedRoute = this.routes.find((route) => route.match(path));

    if (matchedRoute) {
      matchedRoute.render(path);
    }
  }

  getPath() {
    return location.hash.slice(1) || "/";
  }

  static navigateTo(path) {
    location.hash = `#${path}`;
  }
}

window.navigateTo = Router.navigateTo;
