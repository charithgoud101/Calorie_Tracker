import { useState, useEffect, useRef, useCallback } from 'react';
import useStore from '../../store/useStore.js';
import { searchAllFoods } from '../../utils/foodSearch.js';
import { todayStr } from '../../utils/calculations.js';

const SERVING_UNITS = ['g', 'ml', 'katori', 'piece', 'roti', 'bowl', 'cup', 'glass', 'serving', 'slice'];

async function smartParseFoods(text) {
  const res = await fetch('/api/parse-food', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Smart Parse failed');
  }
  return res.json();
}

export default function FoodSearch({ meal, onSaved }) {
  const { foodEntries, customFoods, addFoodEntry } = useStore();
  const [query,          setQuery]          = useState('');
  const [results,        setResults]        = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [selectedFood,   setSelectedFood]   = useState(null);
  const [smartText,      setSmartText]      = useState('');
  const [smartLoading,   setSmartLoading]   = useState(false);
  const [smartItems,     setSmartItems]     = useState(null);
  const [smartError,     setSmartError]     = useState('');
  const [showSmartParse, setShowSmartParse] = useState(false);
  const searchTimeout = useRef(null);

  const today = todayStr();

  const recentFoods = (() => {
    const seen = new Set();
    return foodEntries
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter(e => { if (seen.has(e.foodName)) return false; seen.add(e.foodName); return true; })
      .slice(0, 15)
      .map(e => ({
        id: e.foodName, name: e.foodName,
        calories: e.calories, protein: e.protein, carbs: e.carbs, fat: e.fat, fiber: e.fiber,
        defaultServing: e.servingSize, servingUnit: e.servingUnit, source: 'recent',
      }));
  })();

  const yesterdaySame = (() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];
    return foodEntries
      .filter(e => e.date === yStr && e.mealType === meal)
      .slice(0, 5)
      .map(e => ({
        id: e.id, name: e.foodName,
        calories: e.calories, protein: e.protein, carbs: e.carbs, fat: e.fat, fiber: e.fiber,
        defaultServing: e.servingSize, servingUnit: e.servingUnit, source: 'yesterday',
      }));
  })();

  const doSearch = useCallback(async (q) => {
    if (!q || q.trim().length < 2) { setResults([]); return; }
    setLoading(true);
    try { setResults(await searchAllFoods(q.trim(), customFoods)); }
    finally { setLoading(false); }
  }, [customFoods]);

  useEffect(() => {
    clearTimeout(searchTimeout.current);
    if (query.length < 2) { setResults([]); return; }
    searchTimeout.current = setTimeout(() => doSearch(query), 400);
    return () => clearTimeout(searchTimeout.current);
  }, [query, doSearch]);

  async function handleSmartParse() {
    if (!smartText.trim()) return;
    setSmartLoading(true); setSmartError(''); setSmartItems(null);
    try {
      const data = await smartParseFoods(smartText);
      setSmartItems(data.items || []);
    } catch (e) {
      setSmartError(e.message || 'Failed to parse. Try again.');
    } finally {
      setSmartLoading(false);
    }
  }

  async function logSmartItem(item) {
    await addFoodEntry({
      mealType: meal, foodName: item.name,
      calories: item.calories, protein: item.protein, carbs: item.carbs,
      fat: item.fat, fiber: item.fiber,
      servingSize: item.quantity, servingUnit: item.unit, source: 'ai',
    });
  }

  async function logAllSmartItems() {
    for (const item of smartItems) await logSmartItem(item);
    onSaved();
  }

  if (selectedFood) {
    return <FoodDetail food={selectedFood} meal={meal} onBack={() => setSelectedFood(null)} onSaved={onSaved} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2.5">
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search foods (Indian, USDA, more...)"
              className="flex-1 bg-transparent text-gray-800 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 outline-none"
              autoFocus
            />
            {query && (
              <button onClick={() => { setQuery(''); setResults([]); }}
                      className="text-gray-400 dark:text-gray-500 active:text-gray-600 dark:active:text-gray-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.293 13.293-1.414 1.414L12 13.414l-2.879 2.879-1.414-1.414L10.586 12 7.707 9.121l1.414-1.414L12 10.586l2.879-2.879 1.414 1.414L13.414 12l2.879 2.879z"/>
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={() => { setShowSmartParse(s => !s); setSmartItems(null); setSmartError(''); }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              showSmartParse
                ? 'bg-purple-600 dark:bg-purple-500 text-white'
                : 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            AI
          </button>
        </div>

        {/* Smart Parse panel */}
        {showSmartParse && (
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-3 space-y-2 border border-purple-100 dark:border-purple-800">
            <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">Describe your meal in plain English or Hindi:</p>
            <div className="flex gap-2">
              <input
                type="text" value={smartText} onChange={e => setSmartText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSmartParse()}
                placeholder="e.g. 2 rotis with dal and sabzi, 1 glass milk"
                className="flex-1 bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-purple-400 dark:focus:border-purple-500"
              />
              <button onClick={handleSmartParse} disabled={smartLoading || !smartText.trim()}
                      className="px-3 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg text-sm font-semibold disabled:opacity-50">
                {smartLoading ? '...' : 'Parse'}
              </button>
            </div>
            {smartError && <p className="text-xs text-red-500 dark:text-red-400">{smartError}</p>}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Smart Parse results */}
        {smartItems && smartItems.length > 0 && (
          <div className="mx-4 mt-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl overflow-hidden border border-purple-100 dark:border-purple-800">
            <div className="flex items-center justify-between px-4 py-2.5 bg-purple-100 dark:bg-purple-900/40">
              <p className="text-xs font-bold text-purple-800 dark:text-purple-200 uppercase tracking-wider">
                AI Parsed ({smartItems.length} items)
              </p>
              <button onClick={logAllSmartItems}
                      className="text-xs font-bold text-white bg-purple-600 dark:bg-purple-500 rounded-lg px-3 py-1.5 active:opacity-80">
                Log All
              </button>
            </div>
            {smartItems.map((item, i) => (
              <div key={i} className="flex items-center px-4 py-3 border-b border-purple-100 dark:border-purple-800 last:border-0 bg-white dark:bg-gray-800">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{item.quantity} {item.unit}</p>
                </div>
                <div className="mx-3 text-right">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{item.calories} kcal</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">P:{item.protein} C:{item.carbs} F:{item.fat}</p>
                </div>
                <button onClick={() => logSmartItem(item).then(onSaved)}
                        className="flex-shrink-0 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40 rounded-lg px-3 py-1.5 active:bg-purple-200 dark:active:bg-purple-800">
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
        {smartItems && smartItems.length === 0 && (
          <div className="mx-4 mt-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">Could not parse items. Try rephrasing.</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="w-4 h-4 border-2 border-green-app dark:border-violet-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">Searching...</span>
          </div>
        )}

        {!query && (
          <>
            {yesterdaySame.length > 0 && (
              <Section title="Yesterday at this time">
                {yesterdaySame.map(food => (
                  <FoodRow key={food.id} food={food} onSelect={() => setSelectedFood(food)} />
                ))}
              </Section>
            )}
            {recentFoods.length > 0 && (
              <Section title="Recent">
                {recentFoods.map(food => (
                  <FoodRow key={food.id} food={food} onSelect={() => setSelectedFood(food)} />
                ))}
              </Section>
            )}
            {yesterdaySame.length === 0 && recentFoods.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">
                <span className="text-4xl">🥗</span>
                <p className="mt-2 text-sm">Search for foods or Indian dishes above</p>
              </div>
            )}
          </>
        )}

        {query && !loading && results.length === 0 && query.length >= 2 && (
          <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">
            <p className="text-sm">No results for "{query}"</p>
            <p className="text-xs mt-1">Try manual entry or a different search term</p>
          </div>
        )}

        {results.length > 0 && (
          <Section title={`Results (${results.length})`}>
            {results.map(food => (
              <FoodRow key={food.id || food.name} food={food} onSelect={() => setSelectedFood(food)} />
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-gray-900">
        {title}
      </p>
      <div className="bg-white dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}

function FoodRow({ food, onSelect }) {
  const sourceLabel = {
    local:         '🇮🇳 Indian DB',
    openfoodfacts: '🌐 Open Food Facts',
    usda:          '🇺🇸 USDA',
    recent:        '🕐 Recent',
    yesterday:     '📅 Yesterday',
    custom:        '⭐ Custom',
    ai:            '✨ AI Parsed',
  }[food.source] || food.source;

  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center px-4 py-3 border-b border-gray-50 dark:border-gray-700/50 last:border-0 text-left active:bg-gray-50 dark:active:bg-gray-700/50"
    >
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 dark:text-gray-100 text-sm font-medium truncate">{food.name}</p>
        {food.brand && food.brand !== 'Indian Foods DB' && (
          <p className="text-gray-400 dark:text-gray-500 text-xs truncate">{food.brand}</p>
        )}
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">
          {food.defaultServing}{food.servingUnit !== food.defaultServing ? ` ${food.servingUnit}` : ''} • {sourceLabel}
        </p>
      </div>
      <div className="ml-3 text-right flex-shrink-0">
        <p className="text-gray-700 dark:text-gray-200 text-sm font-bold">{Math.round(food.calories)} kcal</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">P:{Math.round(food.protein)} C:{Math.round(food.carbs)} F:{Math.round(food.fat)}</p>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
           className="w-4 h-4 text-gray-300 dark:text-gray-600 ml-2 flex-shrink-0">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </button>
  );
}

function FoodDetail({ food, meal, onBack, onSaved }) {
  const { addFoodEntry, saveCustomFood } = useStore();
  const [multiplier,  setMultiplier]  = useState(1);
  const [unit,        setUnit]        = useState(food.servingUnit || 'g');
  const [saveCustom,  setSaveCustom]  = useState(false);

  const scaled = {
    calories: food.calories * multiplier,
    protein:  food.protein  * multiplier,
    carbs:    food.carbs    * multiplier,
    fat:      food.fat      * multiplier,
    fiber:    food.fiber    * multiplier,
  };

  async function handleAdd() {
    await addFoodEntry({
      mealType: meal, foodName: food.name,
      calories: scaled.calories, protein: scaled.protein, carbs: scaled.carbs,
      fat: scaled.fat, fiber: scaled.fiber,
      servingSize: multiplier * (food.defaultServing || 1), servingUnit: unit,
      source: food.source || 'search',
    });
    if (saveCustom) {
      await saveCustomFood({
        name: food.name, calories: food.calories, protein: food.protein,
        carbs: food.carbs, fat: food.fat, fiber: food.fiber,
        defaultServing: food.defaultServing || 100, servingUnit: food.servingUnit || 'g', brand: food.brand,
      });
    }
    onSaved();
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <button onClick={onBack} className="text-gray-400 dark:text-gray-500 p-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{food.name}</p>
          {food.brand && <p className="text-gray-400 dark:text-gray-500 text-xs">{food.brand}</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Serving */}
        <div className="card p-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-sm uppercase tracking-wider">Serving Size</h3>
          <div className="flex items-center gap-4 mb-3">
            <button onClick={() => setMultiplier(m => Math.max(0.25, parseFloat((m - 0.25).toFixed(2))))}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-xl flex items-center justify-center active:bg-gray-200 dark:active:bg-gray-600">
              −
            </button>
            <div className="flex-1 text-center">
              <input type="number" inputMode="decimal" step="0.25" min="0.25" value={multiplier}
                     onChange={e => setMultiplier(Math.max(0.25, parseFloat(e.target.value) || 1))}
                     className="text-2xl font-bold text-gray-900 dark:text-white text-center w-full outline-none bg-transparent" />
            </div>
            <button onClick={() => setMultiplier(m => parseFloat((m + 0.25).toFixed(2)))}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-xl flex items-center justify-center active:bg-gray-200 dark:active:bg-gray-600">
              +
            </button>
          </div>
          <select value={unit} onChange={e => setUnit(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 text-sm focus:outline-none">
            {SERVING_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        {/* Nutrition */}
        <div className="card p-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-sm uppercase tracking-wider">Nutrition</h3>
          <div className="space-y-2.5">
            <NutrRow label="Calories"      value={scaled.calories} unit="kcal" bold />
            <NutrRow label="Protein"       value={scaled.protein}  unit="g" />
            <NutrRow label="Carbohydrates" value={scaled.carbs}    unit="g" />
            <NutrRow label="Fat"           value={scaled.fat}      unit="g" />
            <NutrRow label="Fiber"         value={scaled.fiber}    unit="g" />
          </div>
        </div>

        {/* Save as custom */}
        <label className="flex items-center gap-3 card p-4 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50">
          <input type="checkbox" checked={saveCustom} onChange={e => setSaveCustom(e.target.checked)}
                 className="w-5 h-5 accent-violet-600 rounded" />
          <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Save as Custom Food</span>
        </label>
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
           style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <button onClick={handleAdd}
                className="w-full py-4 bg-green-app dark:bg-violet-600 text-white font-bold rounded-2xl text-base shadow-sm active:opacity-90">
          Add to {meal}
        </button>
      </div>
    </div>
  );
}

function NutrRow({ label, value, unit, bold }) {
  return (
    <div className={`flex justify-between items-center py-1 ${bold ? 'border-b border-gray-100 dark:border-gray-700 pb-2 mb-1' : ''}`}>
      <span className={`text-gray-600 dark:text-gray-300 text-sm ${bold ? 'font-bold' : ''}`}>{label}</span>
      <span className={`text-sm ${bold ? 'font-bold text-gray-900 dark:text-white text-base' : 'text-gray-700 dark:text-gray-200'}`}>
        {value.toFixed(1)} {unit}
      </span>
    </div>
  );
}
