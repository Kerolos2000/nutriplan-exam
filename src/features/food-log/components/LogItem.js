import { t } from "../../../core/i18n.js";
import { storageService } from "../../../shared/services/storage.js";

export class LogItem {
  constructor(log) {
    this.log = log;
  }

  render() {
    const l = this.log;

    return `
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group" data-log-id="${l.id}">
        <div class="flex items-center gap-4 flex-1 min-w-0">
          <div class="w-10 h-10 rounded-lg bg-white p-1 shadow-sm shrink-0">
            ${
              l.image
                ? `<img src="${l.image}" class="w-full h-full object-cover rounded">`
                : `<div class="w-full h-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">F</div>`
            }
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap" title="${l.name}">
              ${l.name}
            </div>
            <div class="text-xs text-gray-500 mt-0.5">
              ${l.calories} ${t("caloriesShort")} • ${l.protein}${t("grams")} ${t("proteinShort")} • ${l.carbs}${t("grams")} ${t("carbsShort")} • ${l.fat}${t("grams")} ${t("fatShort")}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0 ms-4">
          <span class="text-xs font-bold text-gray-400">${t("logged")}</span>
          <button class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" data-delete-btn="${l.id}" title="Delete">
            <i class="fa-solid fa-trash-alt text-sm"></i>
          </button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const deleteBtn = document.querySelector(
      `[data-delete-btn="${this.log.id}"]`,
    );
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        storageService.removeLog(this.log.id);
      });
    }
  }
}
