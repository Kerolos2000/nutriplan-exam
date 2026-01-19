export const getYoutubeVideoId = (url) => {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.searchParams.get("v");
  } catch {
    return "";
  }
};
