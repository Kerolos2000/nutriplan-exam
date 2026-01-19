export class ScannerState {
  constructor() {
    this.data = {
      search: "",
      products: [],
      loading: false,
      lastSearchType: "query",
    };
    this.listeners = [];
  }

  update(changes) {
    this.data = { ...this.data, ...changes };
    this.notify();
  }

  get() {
    return this.data;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () =>
      (this.listeners = this.listeners.filter((l) => l !== listener));
  }

  notify() {
    this.listeners.forEach((l) => l(this.data));
  }
}
