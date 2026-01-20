import { t } from "../../../core/i18n.js";

export const LogMealModal = (meal, servings = 1, nutrition) => {
  const p = nutrition?.data?.perServing || {};
  const cal = Math.round(Number(p.calories) * servings);
  const prot = Math.round(Number(p.protein) * servings);
  const carbs = Math.round(Number(p.carbs || p.carbohydrates) * servings);
  const fat = Math.round(Number(p.fat) * servings);

  return `
    <div id="log-meal-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl transform transition-all scale-100 p-6">
        
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
            <img src="${meal.thumbnail || meal.image}" class="w-full h-full object-cover">
          </div>
          <div>
            <h3 class="font-bold text-lg text-gray-900 leading-tight">${t("logThisMeal")}</h3>
            <p class="text-sm text-gray-500">${meal.name}</p>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">${t("numberOfServings")}</label>
          <div class="flex items-center gap-3">
            <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors">
              <i class="fa-solid fa-minus"></i>
            </button>
            <input type="text" id="servings-input" value="${servings}" readonly class="w-16 h-10 text-center font-bold text-lg bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900">
            <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div class="bg-emerald-50 rounded-2xl p-4 mb-8">
          <p class="text-xs text-gray-500 mb-3">${t("estimatedNutritionPerServing")}</p>
          <div class="grid grid-cols-4 gap-2 text-center">
            <div>
              <div class="text-xl font-bold text-emerald-600" id="est-cal">${cal}</div>
              <div class="text-[10px] font-bold text-gray-500 uppercase">${t("calories")}</div>
            </div>
            <div>
              <div class="text-xl font-bold text-blue-600" id="est-prot">${prot}${t("grams")}</div>
              <div class="text-[10px] font-bold text-gray-500 uppercase">${t("protein")}</div>
            </div>
            <div>
              <div class="text-xl font-bold text-yellow-600" id="est-carbs">${carbs}${t("grams")}</div>
              <div class="text-[10px] font-bold text-gray-500 uppercase">${t("carbs")}</div>
            </div>
            <div>
              <div class="text-xl font-bold text-purple-600" id="est-fat">${fat}${t("grams")}</div>
              <div class="text-[10px] font-bold text-gray-500 uppercase">${t("fat")}</div>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button id="cancel-log" class="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors">
            ${t("cancel")}
          </button>
          <button id="confirm-log" class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
            <i class="fa-solid fa-clipboard-check"></i>
            ${t("logMeal")}
          </button>
        </div>

      </div>
    </div>
  `;
};
