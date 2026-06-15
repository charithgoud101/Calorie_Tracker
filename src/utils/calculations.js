// Mifflin-St Jeor BMR + TDEE + macro calculations
export function calculateCalorieTarget(profile) {
  const { biologicalSex, currentWeight, height, age, activityLevel, goalType, rateOfChange } = profile;

  const bmr =
    biologicalSex === 'Male'
      ? 10 * currentWeight + 6.25 * height - 5 * age + 5
      : 10 * currentWeight + 6.25 * height - 5 * age - 161;

  const multipliers = {
    Sedentary: 1.2,
    'Lightly Active': 1.375,
    'Moderately Active': 1.55,
    'Very Active': 1.725,
  };

  let tdee = bmr * (multipliers[activityLevel] || 1.55);

  const dailyChange = ((rateOfChange || 0.5) * 7700) / 7;
  if (goalType === 'Lose Weight') tdee -= dailyChange;
  else if (goalType === 'Gain Weight') tdee += dailyChange;

  return Math.max(1200, Math.round(tdee));
}

export function calculateMacroTargets(calories, dietPreference) {
  switch (dietPreference) {
    case 'Keto':
      return {
        protein: Math.round((calories * 0.25) / 4),
        carbs: Math.round((calories * 0.05) / 4),
        fat: Math.round((calories * 0.70) / 9),
      };
    case 'High Protein':
      return {
        protein: Math.round((calories * 0.35) / 4),
        carbs: Math.round((calories * 0.40) / 4),
        fat: Math.round((calories * 0.25) / 9),
      };
    default:
      return {
        protein: Math.round((calories * 0.25) / 4),
        carbs: Math.round((calories * 0.50) / 4),
        fat: Math.round((calories * 0.25) / 9),
      };
  }
}

export function todayStr() {
  return new Date().toISOString().split('T')[0];
}

export function dateStr(date) {
  if (!date) return todayStr();
  if (typeof date === 'string') return date.split('T')[0];
  return date.toISOString().split('T')[0];
}

export function daysAgoStr(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return dateStr(d);
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function computeStreak(allEntries) {
  if (!allEntries.length) return 0;
  const days = new Set(allEntries.map(e => e.date));
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = dateStr(d);
    if (days.has(ds)) streak++;
    else break;
  }
  return streak;
}

export function computeLongestStreak(allEntries) {
  if (!allEntries.length) return 0;
  const days = [...new Set(allEntries.map(e => e.date))].sort();
  let longest = 0, current = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1] + 'T00:00:00');
    const curr = new Date(days[i] + 'T00:00:00');
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) { current++; longest = Math.max(longest, current); }
    else current = 1;
  }
  return Math.max(longest, current);
}

export function exportCSV(entries, weightLogs) {
  const headers = 'Date,Meal,Food,Calories,Protein(g),Carbs(g),Fat(g),Fiber(g),Serving,Unit\n';
  const rows = entries
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(e =>
      [e.date, e.mealType, `"${e.foodName}"`, Math.round(e.calories),
        e.protein.toFixed(1), e.carbs.toFixed(1), e.fat.toFixed(1), e.fiber.toFixed(1),
        e.servingSize, e.servingUnit].join(',')
    )
    .join('\n');

  const weightRows = weightLogs
    .map(w => `${w.date},Weight Log,"Weight",${w.weightKg}kg,,,,,1,kg`)
    .join('\n');

  return headers + rows + (weightRows ? '\n' + weightRows : '');
}
