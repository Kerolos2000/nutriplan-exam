export function LogButton(id, label, isLoading = false) {
  if (isLoading) {
    return `
      <button id="${id}" disabled
        class="bg-gray-200 text-gray-400 px-6 py-2 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
          <i class="fa-solid fa-spinner animate-spin"></i>
          Calculating...
      </button>
    `;
  }
  return `
    <button id="${id}" 
      class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-bold rounded-xl shadow-sm shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
      <i class="fa-solid fa-file-pen"></i>
      ${label}
    </button>
  `;
}
