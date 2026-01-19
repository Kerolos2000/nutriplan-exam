class StorageManager {
  static LOGS = "logs";
  static GOALS = "goals";

  constructor() {
    this.observers = [];
    this.ensureGoals();
  }

  ensureGoals() {
    if (!localStorage.getItem(StorageManager.GOALS)) {
      localStorage.setItem(
        StorageManager.GOALS,
        JSON.stringify({
          calories: 2000,
          protein: 150,
          carbs: 250,
          fat: 70,
        }),
      );
    }
  }

  read(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : JSON.parse(fallback);
    } catch (e) {
      return JSON.parse(fallback);
    }
  }

  write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLogs() {
    return this.read(StorageManager.LOGS, "[]");
  }

  getLogsByDate(date) {
    return this.getLogs().filter((l) => l.date === date);
  }

  addLog(item) {
    const logs = this.getLogs();
    logs.push({ ...item, id: crypto.randomUUID() });
    this.write(StorageManager.LOGS, logs);
    this.notifyObservers();
  }

  removeLog(id) {
    const logs = this.getLogs();
    const filtered = logs.filter((l) => l.id !== id);
    this.write(StorageManager.LOGS, filtered);
    this.notifyObservers();
  }

  getGoals() {
    return this.read(StorageManager.GOALS, "{}");
  }

  subscribe(callback) {
    this.observers.push(callback);
    return () =>
      (this.observers = this.observers.filter((cb) => cb !== callback));
  }

  notifyObservers() {
    this.observers.forEach((callback) => callback());
  }
}

export const storageService = new StorageManager();
