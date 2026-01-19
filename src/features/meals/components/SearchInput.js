import { BaseComponent } from "../../../core/BaseComponent.js";
import { t } from "../../../core/i18n.js";

export class SearchInput extends BaseComponent {
  onMount() {
    const input = this.element.querySelector("input");
    let debounceTimer;

    input?.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.props.onSearch(e.target.value);
      }, 300);
    });
  }

  render() {
    return `
      <div class="relative max-w-full">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
          </div>
          <input type="text" id="search-input" 
              class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm md:text-base" 
              placeholder="${this.props.placeholder || t("searchRecipes")}">
      </div>
    `;
  }
}
