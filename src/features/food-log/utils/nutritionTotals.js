const asNumber = (v) => {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
};

export const getTotals = (logs) =>
  logs.reduce(
    (a, l) => ({
      calories: a.calories + asNumber(l.calories),
      protein: a.protein + asNumber(l.protein),
      carbs: a.carbs + asNumber(l.carbs),
      fat: a.fat + asNumber(l.fat),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
