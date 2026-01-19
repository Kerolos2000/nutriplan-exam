import { SCANNER_CATEGORIES } from "../../../core/constants.js";
import { t } from "../../../core/i18n.js";
import { ProductCard } from "./ProductCard.js";
import { ScannerCategoryChip } from "./ScannerCategoryChip.js";

export const ScannerView = {
  loading() {
    return `<div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div></div>`;
  },

  noResults(search, lastSearchType) {
    return search
      ? `
        <div class="text-center py-10 animate-fade-in">
            <p class="text-gray-400 text-sm">${t("noProductFoundWith")} ${lastSearchType}: <span class="font-bold text-gray-700">${search}</span></p>
        </div>
      `
      : `
        <div class="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <i class="fa-solid fa-box text-4xl text-gray-300"></i>
            </div>
            <h3 class="font-bold text-gray-800">${t("noProducts")}</h3>
            <p class="text-sm text-gray-400">${t("productDesc")}</p>
        </div>
      `;
  },

  page(data) {
    return `
      <div class="space-y-8 animate-fade-in max-w-7xl mx-auto pb-10">
        <div class="bg-teal-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border-b-4 border-teal-700">
            <div class="flex items-center gap-3 mb-6 relative z-10">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-black tracking-tighter text-2xl shrink-0">||||</div>
                <h2 class="text-2xl font-bold">${t("productSearch")}</h2>
            </div>
            <p class="text-teal-100/80 text-sm mb-6 -mt-4">${t("searchPackaged")}</p>
            <div class="space-y-4 relative z-10">
                <div class="flex flex-col md:flex-row gap-2">
                    <input type="text" id="product-search" 
                        class="flex-1 px-6 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all shadow-inner"
                        placeholder="${t("searchPlaceholder")}"
                        value="${data.search && data.lastSearchType === "query" ? data.search : ""}">
                    <button id="search-btn" class="bg-white text-teal-700 px-6 md:px-10 py-4 rounded-xl font-bold hover:bg-teal-50 transition-all active:scale-95 shadow-lg">
                        ${t("searchButton")}
                    </button>
                </div>
                <div class="flex items-center gap-4 py-2">
                     <div class="h-px bg-teal-500/50 flex-1"></div>
                     <span class="text-teal-200 text-xs font-bold uppercase tracking-widest">${t("or")}</span>
                     <div class="h-px bg-teal-500/50 flex-1"></div>
                </div>
                 <div class="flex flex-col md:flex-row gap-2">
                    <div class="flex-1 relative">
                        <input type="text" id="barcode-search" 
                            class="w-full px-6 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-teal-400 focus:outline-none bg-teal-50 shadow-inner"
                            placeholder="${t("barcodePlaceholder")}"
                            value="${data.search && data.lastSearchType === "barcode" ? data.search : ""}">
                         <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
                            <i class="fa-solid fa-barcode text-gray-900 text-xl"></i>
                         </div>
                    </div>
                    <button id="lookup-btn" class="bg-orange-500 text-white px-6 md:px-10 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        ${t("lookupButton")}
                    </button>
                </div>
            </div>
        </div>
        <div>
             <h3 class="font-bold text-gray-800 mb-4">${t("browseCategory")}</h3>
             <div class="flex flex-wrap gap-2">
                ${SCANNER_CATEGORIES.map((cat) => ScannerCategoryChip(cat)).join("")}
             </div>
        </div>
        <div id="results-area" class="min-h-[200px]">
          ${data.loading ? this.loading() : this.resultsSection(data.products, data.search, data.lastSearchType)}
        </div>
      </div>
    `;
  },

  resultsSection(products, search, lastSearchType) {
    if (products.length === 0) {
      return this.noResults(search, lastSearchType);
    }

    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          ${products.map((p) => ProductCard({ product: p })).join("")}
      </div>
    `;
  },
};
