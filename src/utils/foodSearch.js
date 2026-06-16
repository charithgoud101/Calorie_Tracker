import indianFoods from './indianFoodsData.js';

// Search local Indian foods database
export function searchIndianFoods(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return indianFoods
    .filter(food => {
      const inName = food.name.toLowerCase().includes(q);
      const inAliases = food.aliases?.some(a => a.toLowerCase().includes(q));
      return inName || inAliases;
    })
    .map(food => ({
      id: food.name,
      name: food.name,
      brand: 'Indian Foods DB',
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber,
      defaultServing: food.defaultServing,
      servingUnit: food.servingUnit,
      servingGrams: food.servingGrams,
      source: 'local',
    }));
}

// Search Open Food Facts (free, no API key)
export async function searchOpenFoodFacts(query) {
  if (!query || query.length < 2) return [];
  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=30&fields=product_name,brands,nutriments,serving_size,nutriscore_grade`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || [])
      .filter(p => {
        if (!p.product_name) return false;
        const n = p.nutriments;
        if (!n) return false;
        const kcal = n['energy-kcal_100g'] || n['energy-kcal'];
        return kcal > 0;
      })
      .map(p => {
        const n = p.nutriments;
        const per100 = n['energy-kcal_100g'] || n['energy-kcal'] || 0;
        return {
          id: p.id || p.product_name,
          name: p.product_name.trim(),
          brand: p.brands ? p.brands.split(',')[0].trim() : null,
          calories: Math.round(per100),
          protein: Math.round((n.proteins_100g || 0) * 10) / 10,
          carbs: Math.round((n.carbohydrates_100g || 0) * 10) / 10,
          fat: Math.round((n.fat_100g || 0) * 10) / 10,
          fiber: Math.round((n.fiber_100g || 0) * 10) / 10,
          defaultServing: 100,
          servingUnit: 'g',
          servingGrams: 100,
          source: 'openfoodfacts',
        };
      })
      .slice(0, 20);
  } catch {
    return [];
  }
}

// Search USDA FoodData Central (free, DEMO_KEY = 30 req/hour)
export async function searchUSDA(query) {
  if (!query || query.length < 2) return [];
  try {
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=DEMO_KEY&pageSize=20&dataType=SR%20Legacy,Foundation,Survey%20(FNDDS),Branded`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.foods || [])
      .filter(f => f.description && f.foodNutrients?.length)
      .map(f => {
        const getNutr = (...names) => {
          for (const name of names) {
            const n = f.foodNutrients.find(x => x.nutrientName === name);
            if (n?.value > 0) return Math.round((n.value || 0) * 10) / 10;
          }
          return 0;
        };
        const calories = getNutr('Energy', 'Energy (Atwater General Factors)', 'Energy (Atwater Specific Factors)');
        return {
          id: `usda-${f.fdcId}`,
          name: f.description
            .replace(/,\s*raw$/i, '')
            .replace(/,\s*cooked$/i, ' (cooked)')
            .replace(/,\s*unprepared$/i, ''),
          brand: f.brandOwner || (f.dataType === 'Branded' ? f.brandName : null) || 'USDA',
          calories: Math.round(calories),
          protein: getNutr('Protein'),
          carbs: getNutr('Carbohydrate, by difference'),
          fat: getNutr('Total lipid (fat)'),
          fiber: getNutr('Fiber, total dietary'),
          defaultServing: 100,
          servingUnit: 'g',
          servingGrams: 100,
          source: 'usda',
        };
      })
      .filter(f => f.calories > 0)
      .slice(0, 15);
  } catch {
    return [];
  }
}

// Merge and deduplicate results — local results first
export async function searchAllFoods(query, customFoods = []) {
  const local = searchIndianFoods(query);

  // Search custom foods
  const custom = customFoods
    .filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    .map(f => ({ ...f, source: 'custom' }));

  // Search Open Food Facts + USDA in parallel
  const [offResults, usdaResults] = await Promise.all([
    Promise.race([
      searchOpenFoodFacts(query),
      new Promise(resolve => setTimeout(() => resolve([]), 5000)),
    ]).catch(() => []),
    Promise.race([
      searchUSDA(query),
      new Promise(resolve => setTimeout(() => resolve([]), 5000)),
    ]).catch(() => []),
  ]);

  const combined = [...custom, ...local, ...offResults, ...usdaResults];
  const seen = new Set();
  return combined.filter(f => {
    const key = f.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
