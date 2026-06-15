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
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20&fields=product_name,brands,nutriments,serving_size`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || [])
      .filter(p => p.product_name && p.nutriments?.['energy-kcal_100g'])
      .map(p => {
        const n = p.nutriments;
        const per100 = n['energy-kcal_100g'] || 0;
        return {
          id: p.id || p.product_name,
          name: p.product_name,
          brand: p.brands || null,
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

  // Try Open Food Facts in parallel but don't block on it
  let online = [];
  try {
    online = await Promise.race([
      searchOpenFoodFacts(query),
      new Promise(resolve => setTimeout(() => resolve([]), 5000)),
    ]);
  } catch {
    online = [];
  }

  const combined = [...custom, ...local, ...online];
  const seen = new Set();
  return combined.filter(f => {
    const key = f.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
