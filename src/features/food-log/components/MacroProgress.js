export class MacroProgress {
  constructor({ label, current, goal, unit, colorClass, textClass }) {
    this.label = label;
    this.current = current;
    this.goal = goal;
    this.unit = unit;
    this.colorClass = colorClass;
    this.textClass = textClass;
  }

  render() {
    const percent = Math.min((this.current / this.goal) * 100, 100);
    const isCompleted = percent >= 100;

    return `
      <div class="space-y-3 bg-gray-50 p-4 rounded-xl transition-all ${isCompleted ? "ring-2 ring-offset-2 ring-green-300" : ""}">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-700">${this.label}</span>
          <span class="${this.textClass} font-bold text-lg">${Math.round(percent)}%</span>
        </div>
        <div class="h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <div class="h-full ${this.colorClass} rounded-full transition-all duration-500" style="width:${percent}%"></div>
        </div>
        <div class="flex justify-between text-xs">
          <span class="${this.textClass} font-bold">${Math.round(this.current)} ${this.unit}</span>
          <span class="text-gray-400">/ ${this.goal} ${this.unit}</span>
        </div>
      </div>
    `;
  }
}
