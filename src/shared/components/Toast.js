export class Toast {
  static show(message, { duration = 2500 } = {}) {
    const el = document.createElement("div");
    el.className =
      "fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 font-medium";
    el.innerHTML = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration);
  }
}
