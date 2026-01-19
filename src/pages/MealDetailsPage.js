import { BasePage } from "../core/BasePage.js";
import { DOM } from "../core/DOM.js";
import { t } from "../core/i18n.js";
import { LogButton } from "../features/MealDetails/components/LogButton.js";
import { MealDetailsView } from "../features/MealDetails/components/MealDetailsView.js";
import { NutritionCard } from "../features/MealDetails/components/NutritionCard.js";
import { mealDetailsService } from "../features/MealDetails/services/mealDetailsService.js";
import { getYoutubeVideoId } from "../features/MealDetails/utils/videoId.js";
import { storageService } from "../shared/services/storage.js";
import { todayKey } from "../shared/utils/date.js";

export class MealDetailsPage extends BasePage {
  meal = null;
  nutrition = null;

  constructor(id) {
    super();
    this.mealId = id;
  }

  getMeta() {
    if (!this.meal) {
      return {
        title: t("recipeDetails"),
        subtitle: t("recipeInfo"),
      };
    }

    return {
      title: this.meal.name,
      subtitle: `${t("everythingAbout")} ${this.meal.name}`,
    };
  }

  template() {
    return `<div id="meal-details-container"></div>`;
  }

  async onMount() {
    this.containerEl = DOM.query("#meal-details-container", this.container);
    this.renderLoading(this.containerEl);

    try {
      await this.loadMeal();
      this.renderPage();
      this.loadNutritionInBackground();
      this.bindEvents();
    } catch (err) {
      console.error(err);
      this.containerEl.innerHTML = MealDetailsView.error();
    }
  }

  async loadMeal() {
    this.meal = await mealDetailsService.getMeal(this.mealId);

    if (!this.meal) {
      this.containerEl.innerHTML = MealDetailsView.notFound();
      throw new Error("Meal not found");
    }
  }

  loadNutritionInBackground() {
    mealDetailsService
      .getNutrition(this.meal)
      .then((nutrition) => {
        this.nutrition = nutrition;
        this.renderNutrition();
      })
      .catch((err) => {
        console.error("Nutrition error:", err);
        this.renderNutritionError();
      });
  }

  renderPage() {
    this.containerEl.innerHTML = MealDetailsView.page({
      meal: this.meal,
      nutrition: this.nutrition,
      videoId: getYoutubeVideoId(this.meal.youtube),
    });
  }

  renderNutrition() {
    DOM.query("#header-nutrition-container", this.container)?.replaceChildren(
      this.createCaloriesNode(),
    );

    DOM.query("#card-nutrition-container", this.container)?.replaceChildren(
      this.createNutritionCard(),
    );

    DOM.query("#log-button-container", this.container)?.replaceChildren(
      this.createLogButton(),
    );
  }

  renderNutritionError() {
    const el = DOM.query("#card-nutrition-container", this.container);
    if (!el) return;

    el.innerHTML = `
      <div class="p-4 bg-red-50 text-red-500 rounded-xl text-sm italic">
        ${t("errorLoadingMeal")}
      </div>
    `;
  }

  bindEvents() {
    DOM.on(this.container, "click", (e) => {
      const logBtn = e.target.closest("#log-meal-btn");
      if (logBtn && !logBtn.disabled) {
        this.handleLog(logBtn);
        return;
      }

      const ingredient = e.target.closest(".ingredient-item");
      if (ingredient) {
        this.toggleIngredient(ingredient);
      }
    });
  }

  handleLog(button) {
    this.addLog();
    this.showLogSuccess(button);
  }

  addLog() {
    const p = this.nutrition?.data?.perServing ?? {};
    const num = (v) => (Number.isFinite(+v) ? +v : 0);

    storageService.addLog({
      name: this.meal.name,
      image: this.meal.thumbnail || this.meal.image || null,
      date: todayKey(),
      calories: Math.round(num(p.calories)),
      protein: num(p.protein),
      carbs: num(p.carbs ?? p.carbohydrates),
      fat: num(p.fat),
    });
  }

  showLogSuccess(button) {
    const original = button.innerHTML;

    button.innerHTML = `
      <span class="flex items-center gap-2">
        <i class="fa-solid fa-circle-check"></i>
        ${t("mealLogged")}
      </span>
    `;
    button.classList.replace("bg-blue-600", "bg-green-600");
    button.classList.add("shadow-green-200");

    setTimeout(() => {
      button.innerHTML = original;
      button.classList.replace("bg-green-600", "bg-blue-600");
      button.classList.remove("shadow-green-200");
    }, 2000);
  }

  toggleIngredient(item) {
    const checkbox = DOM.query(".custom-checkbox", item);
    const icon = DOM.query(".check-icon", item);

    const checked = checkbox.classList.contains("bg-emerald-500");
    checkbox.classList.toggle("bg-emerald-500", !checked);
    checkbox.classList.toggle("border-emerald-500", !checked);
    checkbox.classList.toggle("bg-white", checked);
    checkbox.classList.toggle("border-gray-400", checked);
    icon.classList.toggle("hidden", checked);
  }

  /*UI helpers*/

  createCaloriesNode() {
    const span = document.createElement("span");
    span.innerHTML = `
      <i class="fa-solid fa-fire text-emerald-500"></i>
      ${this.nutrition.data.perServing.calories} cal/serving
    `;
    return span;
  }

  createNutritionCard() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = NutritionCard(this.nutrition);
    return wrapper;
  }

  createLogButton() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = LogButton("log-meal-btn", t("logThisMeal"), false);
    return wrapper;
  }
}
