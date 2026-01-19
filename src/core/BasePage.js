export class BasePage {
  constructor() {
    this.container = null;
  }

  async mount(container) {
    if (!container) throw new Error("Container required");
    this.container = container;
    this.container.innerHTML = this.template();
    await this.onMount();
  }

  template() {
    return "";
  }

  async onMount() {}

  getMeta() {
    return { title: "", subtitle: "" };
  }

  renderLoading(container) {
    if (container) {
      container.innerHTML = `<div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>`;
    }
  }

  cleanup() {}
}
