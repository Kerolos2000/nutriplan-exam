export function ScannerCategoryChip({ name, icon, color }) {
  return `
      <button onclick="handleScannerCategoryClick('${name}')" 
          class="px-4 py-2 ${color} text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all active:scale-95 flex items-center gap-2">
          <i class="${icon}"></i> ${name}
      </button>
    `;
}
