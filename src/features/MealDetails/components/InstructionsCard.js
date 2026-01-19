import { t } from "../../../core/i18n.js";

export function InstructionsCard(instructions) {
  return `
    <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <i class="fa-solid fa-seedling text-emerald-500"></i>
        ${t("instructions")}
      </h3>
      <div class="space-y-8">
        ${instructions
          .map(
            (step, i) => `
          <div class="flex gap-5">
            <div class="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-emerald-200 shadow-md">
              ${i + 1}
            </div>
            <div class="pt-1">
              <p class="text-gray-600 leading-relaxed text-lg">${step}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}
