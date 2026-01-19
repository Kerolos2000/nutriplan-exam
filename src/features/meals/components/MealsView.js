import { t } from "../../../core/i18n.js";
import { AreaFilterChips } from "./AreaFilterChips.js";
import { CategoryCard } from "./CategoryCard.js";
import { MealCard } from "./MealCard.js";

export const MealsView = {
  loading() {
    return `<div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>`;
  },

  noResults() {
    return `
      <div class="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 animate-fade-in">
          <div class="text-4xl mb-3"><i class="fa-solid fa-utensils text-gray-300"></i></div>
          <p class="text-gray-500">${t("noMealsFound")}</p>
      </div>
    `;
  },

  page(data) {
    const title = data.search
      ? `${t("results")}: "${data.search}"`
      : data.activeCategory
        ? `${t(data.activeCategory)}`
        : data.activeArea !== "All"
          ? `${data.activeArea}`
          : t("allRecipes");

    const showCategories =
      data.activeArea === "All" && !data.search && !data.activeCategory;
    const isGrid = data.viewMode === "grid";

    return `
      <div class="space-y-8 animate-fade-in">
        <div id="search-container"></div>
        <div id="area-filters-container">
          ${AreaFilterChips({
            areas: data.areas,
            activeArea: data.activeArea,
          })}
        </div>
        
        <div id="content-area" class="space-y-8">
          ${showCategories ? this.categoriesSection(data.categories) : ""}
          
          <section>
            <div class="flex justify-between items-end mb-4">
              <h2 class="text-lg md:text-xl font-bold text-gray-800">${title}</h2>
              <div class="flex items-center gap-4">
                <div class="text-sm text-gray-500">${t("showing")} ${data.meals.length} ${t("recipes")}</div>
                <div class="flex bg-gray-100 rounded-lg p-1 gap-1">
                  <button onclick="handleViewModeChange('grid')" 
                          class="w-8 h-8 flex items-center justify-center rounded-md transition-all ${isGrid ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}">
                    <i class="fa-solid fa-table-cells text-xs"></i>
                  </button>
                  <button onclick="handleViewModeChange('list')"
                          class="w-8 h-8 flex items-center justify-center rounded-md transition-all ${!isGrid ? "bg-white shadow-sm text-emerald-600" : "text-gray-400"}">
                    <i class="fa-solid fa-list text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
            
            ${this.mealsSection(data.meals, data.viewMode)}
          </section>
        </div>
      </div>
    `;
  },

  categoriesSection(categories) {
    return `
      <section class="mb-8">
          <div class="flex justify-between items-end mb-4">
              <div>
                 <h2 class="text-xl font-bold text-gray-800 leading-tight">${t("browseMealType")}</h2>
                 <p class="text-xs text-gray-400">${t("findPerfectRecipe")}</p>
              </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              ${categories
                .slice(0, 12)
                .map((c) => CategoryCard({ category: c }))
                .join("")}
          </div>
      </section>
    `;
  },

  mealsSection(meals, viewMode) {
    if (!meals || meals.length === 0) {
      return this.noResults();
    }

    const isGrid = viewMode === "grid";
    const gridClass = isGrid
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      : "grid grid-cols-1 md:grid-cols-2 gap-4";

    return `
      <div class="${gridClass} animate-fade-in">
          ${meals.map((m) => MealCard({ meal: m, viewMode })).join("")}
      </div>
    `;
  },
};
