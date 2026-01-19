export class MealsPageState {
  constructor() {
    this.data = {
      search: "",
      activeArea: "All",
      activeCategory: null,
      areas: [],
      categories: [],
      meals: [],
      loading: false,
      viewMode: "grid",
    };
    this.listeners = [];
  }

  get() {
    return this.data;
  }

  update(changes) {
    this.data = { ...this.data, ...changes };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () =>
      (this.listeners = this.listeners.filter((l) => l !== listener));
  }

  notify() {
    this.listeners.forEach((l) => l(this.data));
  }

  reset() {
    this.update({
      search: "",
      activeArea: "All",
      activeCategory: null,
      meals: [],
      loading: false,
    });
  }
}
