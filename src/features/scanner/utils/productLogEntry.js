import { todayKey } from "../../../shared/utils/date.js";

const toNumber = (v, round = true) => {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? (round ? Math.round(n) : n) : 0;
};

export const toProductLogEntry = (product) => ({
  name: product.product_name || product.name,
  image: product.image_front_small_url || product.image,
  calories: toNumber(
    product.nutriments?.["energy-kcal_100g"] ??
      product.nutrients?.calories ??
      0,
  ),
  protein: toNumber(
    product.nutriments?.proteins_100g ?? product.nutrients?.protein ?? 0,
  ),
  carbs: toNumber(
    product.nutriments?.carbohydrates_100g ?? product.nutrients?.carbs ?? 0,
  ),
  fat: toNumber(product.nutriments?.fat_100g ?? product.nutrients?.fat ?? 0),
  date: todayKey(),
});
