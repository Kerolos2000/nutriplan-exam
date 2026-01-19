import { CATEGORY_STYLES } from "../../../core/constants.js";
import { t } from "../../../core/i18n.js";

export function CategoryCard({ category }) {
  const style = CATEGORY_STYLES[category.name] || CATEGORY_STYLES.Miscellaneous;

  return `
      <div onclick="handleCategoryClick('${category.name}')" 
          class="${style.bg} ${style.border} border rounded-xl p-2 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all group">
          <div class="${style.iconBg} w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
              <i class="${style.icon}"></i>
          </div>
          <span class="font-bold text-sm text-gray-800">${t(category.name)}</span>
      </div>
    `;
}
