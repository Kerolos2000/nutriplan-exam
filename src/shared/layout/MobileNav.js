import { BaseComponent } from "../../core/BaseComponent.js";
import { t } from "../../core/i18n.js";
import { NAV_ITEMS, isActive } from "../utils/navigation.js";

export class MobileNav extends BaseComponent {
  render() {
    const getActiveClass = (path) =>
      isActive(path) ? "text-emerald-500" : "text-gray-400";

    return `
      <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
          ${NAV_ITEMS.map(
            (item) => `
            <a href="${item.hash}" onclick="event.preventDefault(); navigateTo('${item.path}')" 
              class="flex flex-col items-center gap-1 ${getActiveClass(item.hash)}">
              <i class="${item.icon} text-lg"></i>
              <span class="text-[10px] font-bold">${t(item.labelKey).split(" ")[0]}</span>
            </a>
          `,
          ).join("")}
      </nav>
    `;
  }
}
