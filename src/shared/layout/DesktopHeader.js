import { BaseComponent } from "../../core/BaseComponent.js";
import { getCurrentLang } from "../../core/i18n.js";

export class DesktopHeader extends BaseComponent {
  render() {
    const { title, subtitle } = this.state;
    const currentLang = getCurrentLang();
    const nextLang = currentLang === "en" ? "ar" : "en";

    return `
      <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 md:h-20 flex items-center justify-between w-full">
          <div class="flex flex-col justify-center">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">${title || ""}</h1>
              <p class="text-gray-400 mt-0.5 text-xs md:text-sm">${subtitle || ""}</p>
          </div>
          <button onclick="toggleLanguage()" class="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <i class="fa-solid fa-language text-emerald-600"></i>
              <span class="text-sm font-medium text-gray-700 uppercase">${nextLang}</span>
          </button>
      </header>
    `;
  }
}
