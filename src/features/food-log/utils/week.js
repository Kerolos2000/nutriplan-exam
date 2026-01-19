import { toDateKey } from "../../../shared/utils/date.js";

export const weekDays = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const weekStart = (now = new Date()) => {
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  return start;
};

export const dateKeyAtWeekIndex = (start, i) => {
  const d = new Date(start);
  d.setDate(start.getDate() + i);
  return toDateKey(d);
};
