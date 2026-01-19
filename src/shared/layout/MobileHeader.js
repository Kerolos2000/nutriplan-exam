import { BaseComponent } from "../../core/BaseComponent.js";
import { getCurrentLang, t } from "../../core/i18n.js";

export class MobileHeader extends BaseComponent {
  render() {
    const currentLang = getCurrentLang();
    const nextLang = currentLang === "en" ? "ar" : "en";

    return `
      <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-16 flex items-center justify-between w-full">
          <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <i class="fa-solid fa-leaf"></i>
              </div>
              <h1 class="font-bold text-gray-800">${t("appName")}</h1>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="toggleLanguage()" class="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <i class="fa-solid fa-language text-emerald-600 text-sm"></i>
              <span class="text-xs font-medium text-gray-700 uppercase">${nextLang}</span>
            </button>
            <img src="https://gravatar.com/avatar/eee8fecad1f29849dad91b5b5b7b0a4d7be47e3c8bef26667f0913b051580cf1?v=1754813938000&size=256&d=initials" class="w-8 h-8 rounded-full border border-emerald-100 flex-shrink-0" />
          </div>
      </header>
    `;
  }
}
