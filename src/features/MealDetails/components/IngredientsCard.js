import { t } from "../../../core/i18n.js";

export function IngredientsCard(ingredients) {
  return `
    <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <i class="fa-solid fa-list-check text-emerald-500"></i>
          ${t("ingredients")}
        </h3>
        <span class="text-gray-400 text-sm font-medium">${ingredients.length} items</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${ingredients
          .map(
            (ing) => `
          <div class="ingredient-item flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 bg-white border border-gray-100 cursor-pointer transition-all select-none group">
            <div class="custom-checkbox w-6 h-6 shrink-0 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center transition-all group-hover:border-emerald-400">
              <i class="check-icon fa-solid fa-check text-white text-xs hidden"></i>
            </div>
            <div class="text-gray-700 text-base md:text-lg leading-snug">
              <span class="font-bold text-gray-900">${ing.measure}</span> ${ing.ingredient}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}
