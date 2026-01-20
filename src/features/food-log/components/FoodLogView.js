import { t } from "../../../core/i18n.js";
import { storageService } from "../../../shared/services/storage.js";
import { dateKeyAtWeekIndex, weekDays, weekStart } from "../utils/week.js";

export const FoodLogView = {
  loading() {
    return `<div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div></div>`;
  },

  page(data) {
    const { logs, goals, totals, headerDate, locale, weeklyStats } = data;
    return `
      <div id="food-log-content" class="space-y-6 animate-fade-in max-w-7xl mx-auto overflow-hidden">
        ${this.headerSection(headerDate)}
        ${this.nutritionSummarySection(logs, totals, goals)}
        ${this.weeklyOverviewSection(locale)}
        ${this.weeklyInsightsSection(weeklyStats)}
      </div>
    `;
  },

  headerSection(headerDate) {
    return `
      <div class="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-purple-200">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <i class="fa-solid fa-clipboard-list text-2xl"></i>
              <h2 class="text-2xl font-bold">${t("dailyFoodLog")}</h2>
            </div>
            <p class="text-purple-100 opacity-90">${t("trackDaily")}</p>
          </div>
          <div class="text-right">
            <div class="text-xs uppercase tracking-wider opacity-75">${t("today")}</div>
            <div class="font-bold text-lg">${headerDate}</div>
          </div>
        </div>
      </div>
    `;
  },

  nutritionSummarySection(logs, totals, goals) {
    return `
      <div class="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-6">
          <i class="fa-solid fa-fire text-emerald-500"></i>
          <h3 class="font-bold text-gray-800">${t("todaysNutrition")}</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          ${this.macroProgress(t("calories"), totals.calories, goals.calories, t("caloriesShort"), "bg-emerald-500", "text-emerald-600", true)}
          ${this.macroProgress(t("protein"), totals.protein, goals.protein, t("grams"), "bg-blue-500", "text-blue-600")}
          ${this.macroProgress(t("carbs"), totals.carbs, goals.carbs, t("grams"), "bg-yellow-500", "text-yellow-600")}
          ${this.macroProgress(t("fat"), totals.fat, goals.fat, t("grams"), "bg-red-500", "text-red-600")}
        </div>

        <div class="mt-8 border-t border-gray-100 pt-6">
          <h4 class="text-sm font-bold text-gray-500 mb-4">
            ${t("loggedItems")} (${logs.length})
          </h4>
          ${logs.length === 0 ? this.emptyState() : this.logsList(logs)}
        </div>
      </div>
    `;
  },

  macroProgress(
    label,
    current,
    goal,
    unit,
    colorClass,
    textClass,
    isCalories = false,
  ) {
    const percentage = Math.min((current / goal) * 100, 100);
    const isOver = current > goal;

    const barColor = isCalories && isOver ? "bg-red-500" : colorClass;
    const textColor = isCalories && isOver ? "text-red-600" : textClass;

    return `
      <div class="bg-gray-50 rounded-2xl p-4 transition-all ${isOver && isCalories ? "ring-1 ring-red-100" : ""}">
        <div class="flex justify-between items-center mb-3">
          <span class="font-bold text-gray-800">${label}</span>
          <span class="${textColor} font-bold">${current}${unit} ${isOver ? '<i class="fa-solid fa-triangle-exclamation text-xs"></i>' : ""}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div class="${barColor} h-full rounded-full transition-all duration-500" style="width: ${percentage}%;"></div>
        </div>
        <div class="text-xs text-gray-500 mt-2 flex justify-between">
           <span>Goal: ${goal}${unit}</span>
           ${isOver ? `<span class="text-red-500 font-bold">+${current - goal} over</span>` : ""}
        </div>
      </div>
    `;
  },

  logsList(logs) {
    return `
      <div class="space-y-3">
        ${logs.map((log) => this.logItem(log)).join("")}
      </div>
    `;
  },

  logItem(log) {
    return `
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group">
        <div class="flex items-center gap-4 flex-1 min-w-0">
          <div class="w-10 h-10 rounded-lg bg-white p-1 shadow-sm shrink-0">
            ${
              log.image
                ? `<img src="${log.image}" class="w-full h-full object-cover rounded">`
                : `<div class="w-full h-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">F</div>`
            }
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap" title="${log.name}">
              ${log.name}
            </div>
            <div class="text-xs text-gray-500 mt-0.5">
              ${log.servings ? `${log.servings} servings • ` : ""} ${log.calories} ${t("caloriesShort")} • ${log.protein}${t("grams")} ${t("proteinShort")} • ${log.carbs}${t("grams")} ${t("carbsShort")} • ${log.fat}${t("grams")} ${t("fatShort")}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0 ms-4">
          <span class="text-xs font-bold text-gray-400">${t("logged")}</span>
          <button onclick="handleDeleteLog('${log.id}')" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
            <i class="fa-solid fa-trash-alt text-sm"></i>
          </button>
        </div>
      </div>
    `;
  },

  emptyState() {
    return `
      <div class="text-center py-10">
        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
          <i class="fa-solid fa-utensils text-gray-300"></i>
        </div>
        <p class="text-gray-500 font-medium">${t("noFoodLoggedToday")}</p>
        <p class="text-xs text-gray-400 mb-4">${t("startTracking")}</p>
        <div class="flex justify-center gap-3">
          <button onclick="navigateTo('/')" class="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
            ${t("browseRecipes")}
          </button>
          <button onclick="navigateTo('/scanner')" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            ${t("scanProduct")}
          </button>
        </div>
      </div>
    `;
  },

  weeklyOverviewSection(locale) {
    const now = new Date();
    const start = weekStart(now);

    const weeklyData = weekDays()
      .map((k, i) => {
        const dateKey = dateKeyAtWeekIndex(start, i);
        const logs = storageService.getLogsByDate(dateKey);
        const totals = logs.reduce(
          (acc, log) => ({
            calories: acc.calories + (log.calories || 0),
          }),
          { calories: 0 },
        );

        const isToday = i === now.getDay();
        const cardClass = isToday
          ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg"
          : "bg-gray-50 text-gray-700";

        return `
        <div class="flex flex-col items-center gap-2 p-3 rounded-xl ${cardClass} transition-all hover:shadow-md">
          <span class="font-bold text-sm">${t(k)}</span>
          <span class="text-lg font-bold">${totals.calories}</span>
          <span class="text-xs opacity-75">${t("caloriesShort")}</span>
        </div>
      `;
      })
      .join("");

    return `
      <div class="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-6">
          <i class="fa-solid fa-calendar-week text-gray-500"></i>
          <h3 class="font-bold text-gray-800">${t("weeklyOverview")}</h3>
        </div>
        <div class="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-4 text-center">
          ${weeklyData}
        </div>
      </div>
    `;
  },

  weeklyInsightsSection(stats) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Weekly Average -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shrink-0">
            <i class="fa-solid fa-chart-line"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">${t("weeklyAverage")}</div>
            <div class="text-2xl font-black text-gray-900">${stats.averageCalories} <span class="text-lg font-bold text-gray-400">kcal</span></div>
          </div>
        </div>

        <!-- Total Items -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shrink-0">
            <i class="fa-solid fa-utensils"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">${t("totalItemsThisWeek")}</div>
            <div class="text-2xl font-black text-gray-900">${stats.totalItems} <span class="text-lg font-bold text-gray-400">items</span></div>
          </div>
        </div>

        <!-- Days On Goal -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl shrink-0">
            <i class="fa-solid fa-bullseye"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">${t("daysOnGoal")}</div>
            <div class="text-2xl font-black text-gray-900">${stats.daysOnGoal} <span class="text-lg font-bold text-gray-400">/ 7</span></div>
          </div>
        </div>
      </div>
    `;
  },
};
