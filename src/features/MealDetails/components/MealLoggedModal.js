import { t } from "../../../core/i18n.js";

export const MealLoggedModal = (mealName, servings, totalCalories) => {
  return `
    <div id="meal-logged-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl w-full max-w-sm shadow-2xl transform transition-all scale-100 p-8 text-center">
        
        <div class="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <i class="fa-solid fa-check text-4xl text-green-500"></i>
        </div>

        <h3 class="text-2xl font-bold text-gray-900 mb-4">${t("mealLoggedSuccess")}</h3>
        
        <p class="text-gray-600 mb-2 leading-relaxed">
          <span class="font-bold text-gray-800">${mealName}</span> (${servings} servings) ${t("mealLoggedMessage")}
        </p>

        <div class="text-green-600 font-bold text-lg mb-8">
          +${totalCalories} ${t("caloriesAdded")}
        </div>

      </div>
    </div>
  `;
};
