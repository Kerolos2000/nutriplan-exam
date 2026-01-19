import { t } from "../../../core/i18n.js";

export function AreaFilterChips({ areas, activeArea }) {
  return `
      <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        ${areas
          .slice(0, 11)
          .map(
            (area) => `
          <button 
              onclick="handleAreaFilterChange('${area}')"
              class="px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeArea === area
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }">
              ${area === "All" ? t("all") : area}
          </button>
        `,
          )
          .join("")}
      </div>
    `;
}
