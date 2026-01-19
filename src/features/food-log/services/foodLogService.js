import { storageService } from "../../../shared/services/storage.js";
import { todayKey } from "../../../shared/utils/date.js";
import { getTotals } from "../utils/nutritionTotals.js";
import { dateKeyAtWeekIndex, weekStart } from "../utils/week.js";

export class FoodLogService {
  getTodaysLogs() {
    return storageService.getLogsByDate(todayKey());
  }

  getGoals() {
    return storageService.getGoals();
  }

  removeLog(id) {
    storageService.removeLog(id);
  }

  getTotals(logs) {
    return getTotals(logs);
  }

  getWeeklyStats() {
    const start = weekStart();
    const goals = this.getGoals();
    let totalCalories = 0;
    let totalItems = 0;
    let daysOnGoal = 0;
    let loggedDays = 0;

    for (let i = 0; i < 7; i++) {
      const dateKey = dateKeyAtWeekIndex(start, i);
      const logs = storageService.getLogsByDate(dateKey);

      if (logs.length > 0) {
        const totals = this.getTotals(logs);
        totalCalories += totals.calories;
        totalItems += logs.length;
        loggedDays++;
        if (totals.calories <= goals.calories && totals.calories > 0) {
          daysOnGoal++;
        }
      }
    }

    return {
      averageCalories:
        loggedDays > 0 ? Math.round(totalCalories / loggedDays) : 0,
      totalItems,
      daysOnGoal,
    };
  }

  subscribe(callback) {
    storageService.subscribe(callback);
  }
}

export const foodLogService = new FoodLogService();
