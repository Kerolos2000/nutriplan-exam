import { DOM } from "../../core/DOM.js";
import { toggleLanguage } from "../../core/i18n.js";
import { Sidebar } from "../components/Sidebar.js";
import { DesktopHeader } from "./DesktopHeader.js";
import { MobileHeader } from "./MobileHeader.js";
import { MobileNav } from "./MobileNav.js";

export class DashboardLayout {
  constructor(root) {
    this.root = root;
    this.sidebar = new Sidebar();
    this.mobileHeader = new MobileHeader();
    this.mobileNav = new MobileNav();
    this.desktopHeader = new DesktopHeader();
    this.isShellRendered = false;
    this.setupGlobalFunctions();
  }

  setupGlobalFunctions() {
    window.toggleLanguage = toggleLanguage;
  }

  renderShell() {
    this.root.innerHTML = `
      <div class="flex min-h-screen bg-gray-50 flex-col md:flex-row">
        <div id="sidebar-container" class="md:w-64"></div>
        <div id="mobile-header-container" class="sticky top-0 z-40 md:hidden"></div>
        
        <div class="flex-1 flex flex-col md:ms-0 min-w-0">
          <div id="desktop-header-container" class="sticky top-16 md:top-0 z-30"></div>
          <main class="flex-1 p-4 md:p-8 bg-gray-50/30 pb-24 md:pb-8">
            <div id="page"></div>
          </main>
        </div>

        <div id="mobile-nav-container"></div>
      </div>
    `;

    this.sidebar.mount(DOM.query("#sidebar-container"));
    this.mobileHeader.mount(DOM.query("#mobile-header-container"));
    this.mobileNav.mount(DOM.query("#mobile-nav-container"));
    this.desktopHeader.mount(DOM.query("#desktop-header-container"));
  }

  render(page) {
    this.renderShell();

    const meta = page.getMeta?.();
    this.desktopHeader.setState(meta);

    const pageContainer = DOM.query("#page", this.root);
    if (pageContainer) {
      pageContainer.innerHTML = "";
      page.mount(pageContainer);
    }
  }
}
