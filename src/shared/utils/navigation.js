import { t } from "../../core/i18n.js";

export const NAV_ITEMS = [
  {
    path: "/",
    hash: "#/",
    labelKey: "meals",
    icon: "fa-solid fa-utensils"
  },
  {
    path: "/scanner",
    hash: "#/scanner",
    labelKey: "scanner",
    icon: "fa-solid fa-barcode"
  },
  {
    path: "/foodlog",
    hash: "#/foodlog",
    labelKey: "log",
    icon: "fa-solid fa-clipboard-check"
  }
];

export const getActivePath = () => window.location.hash || "#/";

export const isActive = (path) => getActivePath() === path;
