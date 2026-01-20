import { BasePage } from "../core/BasePage.js";
import { DOM } from "../core/DOM.js";
import { t } from "../core/i18n.js";
import { LogButton } from "../features/MealDetails/components/LogButton.js";
import { LogMealModal } from "../features/MealDetails/components/LogMealModal.js";
import { MealDetailsView } from "../features/MealDetails/components/MealDetailsView.js";
import { MealLoggedModal } from "../features/MealDetails/components/MealLoggedModal.js";
import { NutritionCard } from "../features/MealDetails/components/NutritionCard.js";
import { mealDetailsService } from "../features/MealDetails/services/mealDetailsService.js";
import { getYoutubeVideoId } from "../features/MealDetails/utils/videoId.js";
import { storageService } from "../shared/services/storage.js";
import { todayKey } from "../shared/utils/date.js";

export class MealDetailsPage extends BasePage {
  meal = null;
  nutrition = null;
  currentServings = 1;

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
        this.openLogModal();
        return;
      }

      const ingredient = e.target.closest(".ingredient-item");
      if (ingredient) {
        this.toggleIngredient(ingredient);
      }
    });
  }

  openLogModal() {
    this.currentServings = 1;
    const modalHtml = LogMealModal(
      this.meal,
      this.currentServings,
      this.nutrition,
    );

    const wrapper = document.createElement("div");
    wrapper.innerHTML = modalHtml;
    this.modalEl = wrapper.firstElementChild;
    document.body.appendChild(this.modalEl);

    this.bindModalEvents();
  }

  closeLogModal() {
    if (this.modalEl) {
      this.modalEl.remove();
      this.modalEl = null;
    }
  }

  bindModalEvents() {
    if (!this.modalEl) return;

    const cancelBtn = this.modalEl.querySelector("#cancel-log");
    const confirmBtn = this.modalEl.querySelector("#confirm-log");
    const plusBtn = this.modalEl.querySelector("#increase-servings");
    const minusBtn = this.modalEl.querySelector("#decrease-servings");

    cancelBtn?.addEventListener("click", () => this.closeLogModal());
    confirmBtn?.addEventListener("click", () => this.confirmLog());

    plusBtn?.addEventListener("click", () => this.updateServings(0.5));
    minusBtn?.addEventListener("click", () => this.updateServings(-0.5));
  }

  updateServings(delta) {
    const newServings = this.currentServings + delta;
    if (newServings < 0.5) return;

    this.currentServings = newServings;

    const input = this.modalEl.querySelector("#servings-input");
    if (input) input.value = this.currentServings;

    if (this.nutrition?.data?.perServing) {
      const p = this.nutrition.data.perServing;
      const m = (val) => Math.round(Number(val) * this.currentServings);

      const updateText = (id, val, unit = "") => {
        const el = this.modalEl.querySelector(id);
        if (el) el.textContent = `${val}${unit}`;
      };

      updateText("#est-cal", m(p.calories));
      updateText("#est-prot", m(p.protein), t("grams"));
      updateText("#est-carbs", m(p.carbs || p.carbohydrates), t("grams"));
      updateText("#est-fat", m(p.fat), t("grams"));
    }
  }

  confirmLog() {
    const totalCalories = this.addLog();
    this.closeLogModal();
    this.showSuccessModal(totalCalories);
  }

  addLog() {
    const p = this.nutrition?.data?.perServing ?? {};
    const num = (v) => (Number.isFinite(+v) ? +v : 0);
    const factor = this.currentServings;

    const totalCalories = Math.round(num(p.calories) * factor);

    storageService.addLog({
      name: this.meal.name,
      image: this.meal.thumbnail || this.meal.image || null,
      date: todayKey(),
      calories: totalCalories,
      protein: Math.round(num(p.protein) * factor),
      carbs: Math.round(num(p.carbs || p.carbohydrates) * factor),
      fat: Math.round(num(p.fat) * factor),
      servings: this.currentServings, // Optional: save servings count if needed later
    });

    return totalCalories;
  }

  showSuccessModal(totalCalories) {
    const modalHtml = MealLoggedModal(
      this.meal.name,
      this.currentServings,
      totalCalories,
    );
    const wrapper = document.createElement("div");
    wrapper.innerHTML = modalHtml;
    const successModalEl = wrapper.firstElementChild;
    document.body.appendChild(successModalEl);

    setTimeout(() => {
      successModalEl.classList.add(
        "opacity-0",
        "transition-opacity",
        "duration-500",
      );
      setTimeout(() => successModalEl.remove(), 500);
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
