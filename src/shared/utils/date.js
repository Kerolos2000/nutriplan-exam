export const toDateKey = (date) => date.toISOString().split("T")[0];

export const todayKey = () => toDateKey(new Date());
