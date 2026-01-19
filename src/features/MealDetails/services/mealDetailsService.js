import { api } from "../../../shared/services/api.js";

export class MealDetailsService {
  async getMeal(mealId) {
    return await api.fetchMealById(mealId);
  }

  async getNutrition(meal) {
    const ingredients = meal.ingredients?.map(
      (ing) => `${ing.measure} ${ing.ingredient}`,
    );
    return await api.fetchNutritionData(meal.name, ingredients);
  }
}

export const mealDetailsService = new MealDetailsService();
