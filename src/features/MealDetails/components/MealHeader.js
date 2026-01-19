import { t } from "../../../core/i18n.js";

export function MealHeader(meal, nutrition) {
  const nutritionText = nutrition
    ? `${nutrition.data.perServing.calories} cal/serving`
    : "Calculating...";

  return `
    <div class="relative h-64 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
      <img src="${meal.thumbnail}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 md:p-12">
        <div class="w-full">
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-emerald-600 text-white px-3 py-1 rounded-md text-sm font-bold shadow-sm backdrop-blur-sm">${t(meal.category)}</span>
            <span class="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-bold shadow-sm backdrop-blur-sm">${t(meal.area)}</span>
          </div>
          <h1 class="text-3xl md:text-6xl font-extrabold text-white mb-4 leading-tight">${meal.name}</h1>
          <div class="flex items-center gap-6 text-white/90 text-sm md:text-base font-medium">
            <span class="flex items-center gap-2"><i class="fa-regular fa-clock"></i> 30 min</span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-utensils"></i> 4 servings</span>
            <div id="header-nutrition-container" class="flex items-center gap-2">
              <i class="fa-solid fa-fire"></i> 
              <span>${nutritionText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
