import { t } from "../../../core/i18n.js";

export function MealCard({ meal, viewMode }) {
  const desc = meal.instructions
    ? (Array.isArray(meal.instructions)
        ? meal.instructions.join(" ")
        : meal.instructions
      ).slice(0, viewMode === "grid" ? 80 : 120) + "..."
    : `${t("deliciousDish")}.`;

  const renderTags = (meal, isList = false) => {
    const size = isList ? "w-8 h-8 text-sm" : "w-6 h-6 text-[10px]";
    const iconSize = isList ? "" : "text-[8px]";

    return `
      <div class="flex items-center gap-2">
          <div class="${size} rounded-lg bg-emerald-50 flex items-center justify-center">
            <i class="fa-solid fa-utensils ${iconSize} text-emerald-600"></i>
          </div>
          <span class="${isList ? "text-xs italic font-bold" : "text-[10px] font-bold"} text-gray-700">
            ${t(meal.category) || t("meal")}
          </span>
      </div>
      <div class="flex items-center gap-2">
          <div class="${size} rounded-lg bg-blue-50 flex items-center justify-center">
            <i class="fa-solid fa-globe ${iconSize} text-blue-600"></i>
          </div>
          <span class="${isList ? "text-xs italic font-bold" : "text-[10px] font-bold"} text-gray-700">
            ${t(meal.area) || t("global")}
          </span>
      </div>
    `;
  };

  if (viewMode === "grid") {
    return `
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
          onclick="navigateTo('/meal/${meal.id}')">
          <div class="relative h-48 overflow-hidden">
              <img src="${meal.thumbnail}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
          </div>
          <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                  <h3 class="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">${meal.name}</h3>
                  <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      ${desc}
                  </p>
              </div>
              <div class="pt-4 border-t border-gray-50 flex justify-between items-center">
                  ${renderTags(meal)}
              </div>
          </div>
      </div>
    `;
  }

  return `
    <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex h-40 md:h-48"
        onclick="navigateTo('/meal/${meal.id}')">
        <div class="w-1/3 h-full overflow-hidden relative">
            <img src="${meal.thumbnail}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between min-w-0">
            <div class="space-y-2">
                <h3 class="font-bold text-gray-900 text-lg md:text-xl line-clamp-1 group-hover:text-emerald-600 transition-colors">${meal.name}</h3>
                <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    ${desc}
                </p>
            </div>
            <div class="flex justify-between items-center mt-auto pt-4">
                ${renderTags(meal, true)}
            </div>
        </div>
    </div>
  `;
}
