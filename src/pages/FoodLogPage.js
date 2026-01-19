import { BasePage } from "../core/BasePage.js";
import { t } from "../core/i18n.js";
import { FoodLogView } from "../features/food-log/components/FoodLogView.js";
import { foodLogService } from "../features/food-log/services/foodLogService.js";

export class FoodLogPage extends BasePage {
  getMeta() {
    return {
      title: t("dailyFoodLog"),
      subtitle: t("trackDaily"),
    };
  }

  template() {
    return `<div id="food-log-container"></div>`;
  }

  async onMount() {
    this.containerEl = this.container.querySelector("#food-log-container");
    foodLogService.subscribe(() => this.render());
    this.setupGlobalHandlers();
    this.render();
  }

  render() {
    if (!this.containerEl) return;

    const logs = foodLogService.getTodaysLogs();
    const goals = foodLogService.getGoals();
    const totals = foodLogService.getTotals(logs);
    const weeklyStats = foodLogService.getWeeklyStats();

    const headerDate = new Date().toLocaleDateString(this.locale, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    this.containerEl.innerHTML = FoodLogView.page({
      logs,
      goals,
      totals,
      headerDate,
      weeklyStats,
      locale: this.locale,
    });
  }

  setupGlobalHandlers() {
    window.handleDeleteLog = (id) => foodLogService.removeLog(id);
  }

  cleanup() {
    window.handleDeleteLog = null;
  }
}
