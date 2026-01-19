import { t } from "../../../core/i18n.js";

export function NutritionCard(nutrition) {
  if (!nutrition) {
    return `
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px] text-center">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
              <i class="fa-solid fa-calculator text-xl"></i>
          </div>
          <h3 class="font-bold text-gray-800 text-lg mb-1">Calculating Nutrition</h3>
          <p class="text-gray-400 text-sm mb-6">Analyzing ingredients...</p>
          <div class="flex gap-1.5 justify-center">
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
          </div>
      </div>
    `;
  }
  const per = nutrition.data.perServing;

  const macros = [
    { label: "Protein", value: per.protein, color: "bg-[#10B981]" },
    { label: "Carbs", value: per.carbs, color: "bg-[#3B82F6]" },
    { label: "Fat", value: per.fat, color: "bg-[#A855F7]" },
    { label: "Fiber", value: per.fiber, color: "bg-[#F97316]" },
    { label: "Sugar", value: per.sugar, color: "bg-[#EC4899]" },
    {
      label: "Saturated Fat",
      value: per.saturatedFat,
      color: "bg-[#EF4444]",
    },
  ];

  const maxValue = Math.max(...macros.map((m) => m.value), 1);

  return `
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div class="mb-6">
        <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
          <div class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
            <i class="fa-solid fa-chart-pie"></i>
          </div>
          ${t("nutritionFacts")}
        </h3>
        <p class="text-gray-400 text-sm pl-8">${t("perServing")}</p>
      </div>

      <div class="bg-[#F0FDF4] rounded-2xl p-6 text-center mb-8">
        <div class="text-gray-600 font-medium text-sm mb-1">Calories per serving</div>
        <div class="text-5xl font-bold text-[#059669] mb-2">${per.calories}</div>
        <div class="text-gray-400 text-sm">Total: ${per.calories} cal</div>
      </div>

      <div class="space-y-6">
        ${macros
          .map((m) => {
            const width = Math.round((m.value / maxValue) * 100);
            return `
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full ${m.color}"></div>
                    <span class="text-gray-600 font-medium text-lg">${m.label}</span>
                  </div>
                  <span class="text-gray-900 font-bold text-lg">${m.value}g</span>
                </div>
                <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full ${m.color} rounded-full" style="width: ${width}%;"></div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>

      <div class="pt-6 mt-6 border-t border-gray-100">
        <h4 class="font-bold text-gray-900 mb-4 text-base">Other</h4>
        <div class="flex justify-between items-center text-sm md:text-base">
          <span class="text-gray-600">Cholesterol</span>
          <span class="font-bold text-gray-900">${per.cholesterol}mg</span>
        </div>
        <div class="flex justify-between items-center text-sm md:text-base mt-3">
          <span class="text-gray-600">Sodium</span>
          <span class="font-bold text-gray-900">${per.sodium}mg</span>
        </div>
      </div>
    </div>
  `;
}
