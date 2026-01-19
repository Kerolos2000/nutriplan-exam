import { Router } from "../router/Router.js";
import { createRoutes } from "../router/routes.js";
import { DashboardLayout } from "../shared/layout/DashboardLayout.js";

export class App {
  constructor(root) {
    this.currentPage = null;
    this.layout = new DashboardLayout(root);
    this.router = new Router(createRoutes((page) => this.render(page)));
  }

  render(page) {
    if (this.currentPage?.cleanup) {
      this.currentPage.cleanup();
    }
    this.currentPage = page;
    this.layout.render(page);
  }

  start() {
    this.router.init();
  }
}
