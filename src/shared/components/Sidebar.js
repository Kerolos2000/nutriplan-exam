import { BaseComponent } from "../../core/BaseComponent.js";
import { t } from "../../core/i18n.js";
import { NAV_ITEMS, isActive } from "../utils/navigation.js";

const ACTIVE_CLASSES = [
  "bg-emerald-50",
  "text-emerald-600",
  "border-e-4",
  "border-emerald-500",
];

const INACTIVE_CLASSES = ["text-gray-600", "hover:bg-gray-50"];

export class Sidebar extends BaseComponent {
  onMount() {
    this.updateActiveLinks();
  }

  updateActiveLinks() {
    if (!this.element) return;

    this.element.querySelectorAll(".nav-link").forEach((link) => {
      const active = isActive(link.dataset.path);
      this.toggleClasses(link, ACTIVE_CLASSES, active);
      this.toggleClasses(link, INACTIVE_CLASSES, !active);
    });
  }

  toggleClasses(element, classes, condition) {
    classes.forEach((cls) => element.classList.toggle(cls, condition));
  }

  getNavItem(item) {
    const active = isActive(item.hash);
    const classes = active ? ACTIVE_CLASSES : INACTIVE_CLASSES;

    return `
      <a
        href="${item.hash}"
        data-path="${item.hash}"
        onclick="event.preventDefault(); navigateTo('${item.path}')"
        class="nav-link flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${classes.join(" ")}"
      >
        <i class="${item.icon} w-5 text-center"></i>
        ${t(item.labelKey)}
      </a>
    `;
  }

  render() {
    return `
      <aside class="w-64 fixed start-0 top-0 h-screen bg-white border-e border-gray-100 hidden md:flex flex-col z-50">
        
        <header class="border-b border-gray-100 px-4 h-20 flex items-center">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-leaf text-xl text-white"></i>
            </div>
            <div>
              <h1 class="font-bold text-lg text-gray-800">${t("appName")}</h1>
              <p class="text-xs text-gray-400">${t("slogan")}</p>
            </div>
          </div>
        </header>

        <section class="px-4 py-4">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            ${t("mainMenu")}
          </p>
          <nav class="space-y-1">
            ${NAV_ITEMS.map((item) => this.getNavItem(item)).join("")}
          </nav>
        </section>

        <footer class="mt-auto p-4 border-t border-gray-100">
          <div class="flex items-center gap-3">
            <img
              src="https://gravatar.com/avatar/eee8fecad1f29849dad91b5b5b7b0a4d7be47e3c8bef26667f0913b051580cf1?size=256&d=initials"
              class="w-10 h-10 rounded-full border-2 border-emerald-100"
            />
            <div>
              <h3 class="text-sm font-bold text-gray-800">Kero M.</h3>
              <p class="text-xs text-emerald-600 font-medium">${t("premium")}</p>
            </div>
          </div>
        </footer>
      </aside>
    `;
  }
}
