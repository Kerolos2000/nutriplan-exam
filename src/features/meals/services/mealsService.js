import { api } from "../../../shared/services/api.js";

export class MealsService {
  async getInitialData() {
    const [areas, categories, meals] = await Promise.all([
      api.fetchAreas(),
      api.fetchCategories(),
      api.searchMeals(""),
    ]);

    return {
      areas: ["All", ...areas.map((a) => a.name)],
      categories,
      meals: meals.slice(0, 12),
    };
  }

  async search(query) {
    const results = await api.searchMeals(query);
    return results ? results.slice(0, 12) : [];
  }

  async byArea(area) {
    const results =
      area === "All" ? await api.searchMeals("") : await api.filterByArea(area);
    return results;
  }

  async byCategory(category) {
    const results = await api.filterByCategory(category);
    return results;
  }
}

export const mealsService = new MealsService();
