import { t } from "../../../core/i18n.js";

export function VideoCard(videoId) {
  if (!videoId) return "";
  return `
    <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <i class="fa-brands fa-youtube text-red-500"></i>
        ${t("videoTutorial")}
      </h3>
      <div class="aspect-video rounded-xl overflow-hidden bg-black shadow-sm">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;
}
