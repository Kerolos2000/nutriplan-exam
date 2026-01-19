import { t } from "../../../core/i18n.js";

export function ProductCard({ product: p }) {
  return `
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-5 items-center hover:shadow-md transition-shadow group">
          <div class="w-24 h-24 bg-gray-50 rounded-2xl shrink-0 p-2 overflow-hidden border border-gray-50">
              <img src="${p.image}" 
                    class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                    onerror="this.src='https://placehold.co/150x150?text=No+Img'">
          </div>
          <div class="flex-1 min-w-0">
              <span class="text-[10px] font-bold text-teal-600 border border-teal-100 px-2 py-0.5 rounded-md uppercase tracking-wider">${p.brand || t("generic")}</span>
              <h3 class="font-bold text-gray-900 line-clamp-1 mt-1">${p.name || t("unknownProduct")}</h3>
              <div class="flex gap-4 mt-1 text-xs text-gray-400">
                    <div class="flex flex-col">
                      <span class="font-bold text-gray-700">${Math.round(p.nutrients?.calories)}</span>
                      <span class="scale-90 origin-left">${t("caloriesShort")}</span>
                    </div>
                    <div class="flex flex-col">
                      <span class="font-bold text-gray-700">${p.nutrients?.protein?.toFixed(1)} ${t("grams")}</span>
                      <span class="scale-90 origin-left">${t("proteinShort")}</span>
                    </div>
                    <div class="flex flex-col">
                      <span class="font-bold text-gray-700">${p.nutrients?.carbs?.toFixed(1)} ${t("grams")}</span>
                      <span class="scale-90 origin-left">${t("carbsShort")}</span>
                    </div>
              </div>
          </div>
          <button onclick="logProduct('${p.barcode || p.id}')" 
              data-product-btn="${p.barcode || p.id}"
              class="bg-teal-50 text-teal-600 p-3 rounded-xl hover:bg-teal-600 hover:text-white transition-all active:scale-90 shadow-sm flex items-center justify-center gap-2 font-medium text-sm">
              <i class="fa-solid fa-plus"></i> <span class="hidden sm:inline">${t("addToDaily")}</span>
          </button>
      </div>
    `;
}
