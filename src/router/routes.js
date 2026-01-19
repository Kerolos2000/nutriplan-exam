import { FoodLogPage } from "../pages/FoodLogPage.js";
import { MealDetailsPage } from "../pages/MealDetailsPage.js";
import { MealsPage } from "../pages/MealsPage.js";
import { ProductScannerPage } from "../pages/ProductScannerPage.js";
import { Route } from "./Route.js";

export const createRoutes = (render) =>
  [
    new Route("/", () => new MealsPage()),
    new Route(/^\/meal\/.+$/, (id) => new MealDetailsPage(id)),
    new Route("/foodlog", () => new FoodLogPage()),
    new Route("/scanner", () => new ProductScannerPage()),
  ].map((route) => ({
    match: (path) => route.match(path),
    render: (path) => render(route.createPage(path)),
  }));
