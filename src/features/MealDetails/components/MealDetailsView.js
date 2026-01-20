import { t } from "../../../core/i18n.js";
import { IngredientsCard } from "./IngredientsCard.js";
import { InstructionsCard } from "./InstructionsCard.js";
import { LogButton } from "./LogButton.js";
import { MealHeader } from "./MealHeader.js";
import { NutritionCard } from "./NutritionCard.js";
import { VideoCard } from "./VideoCard.js";

export const MealDetailsView = {
  loading() {
    return `<div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>`;
  },

  notFound() {
    return `<div class="p-8 text-center bg-red-50 text-red-600 rounded-xl">${t("mealNotFound")}</div>`;
  },

  error() {
    return `<div class="p-8 text-center bg-red-50 text-red-600 rounded-xl">${t("errorLoadingMeal")}</div>`;
  },

  page({ meal, nutrition, videoId }) {
    const ingredients = meal.ingredients;
    return `
      <div class="space-y-8 pb-10 max-w-7xl mx-auto">
        <a href="#/" onclick="event.preventDefault(); navigateTo('/')" class="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors gap-2 font-medium">
          <i class="fa-solid fa-arrow-left"></i> ${t("backToRecipes")}
        </a>

        ${MealHeader(meal, nutrition)}

        <div id="log-button-container" class="flex justify-start">
          ${LogButton("log-meal-btn", t("logThisMeal"), !nutrition)}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 space-y-6">
            ${IngredientsCard(ingredients)}
            ${InstructionsCard(meal.instructions)}
            ${VideoCard(videoId)}
          </div>

          <div class="space-y-6">
            <div id="card-nutrition-container">
              ${NutritionCard(nutrition)}
            </div>
          </div>
        </div>
      </div>
    `;
  },
};
