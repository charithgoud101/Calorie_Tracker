import { useState, useEffect } from 'react';
import useStore from '../../store/useStore.js';
import { generateId, todayStr } from '../../utils/calculations.js';
import { searchAllFoods } from '../../utils/foodSearch.js';

export default function Recipes() {
  const { recipes, saveRecipe, deleteRecipe, addFoodEntry } = useStore();
  const [view, setView] = useState('list'); // 'list' | 'create' | 'detail'
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);

  if (view === 'create') {
    return <RecipeEditor
      recipe={editing}
      onSave={async (r) => { await saveRecipe(r); setView('list'); setEditing(null); }}
      onCancel={() => { setView('list'); setEditing(null); }}
    />;
  }

  if (view === 'detail' && selected) {
    return <RecipeDetail
      recipe={selected}
      onBack={() => { setView('list'); setSelected(null); }}
      onEdit={() => { setEditing(selected); setView('create'); }}
      onLog={async (meal, servings) => {
        const factor = servings / (selected.servings || 1);
        await addFoodEntry({
          mealType: meal,
          foodName: selected.name,
          calories: selected.totalCalories * factor,
          protein: selected.totalProtein * factor,
          carbs: selected.totalCarbs * factor,
          fat: selected.totalFat * factor,
          fiber: selected.totalFiber * factor,
          servingSize: servings,
          servingUnit: 'serving',
          source: 'recipe',
        });
        setView('list');
        setSelected(null);
      }}
    />;
  }

  return (
    <div className="h-screen overflow-y-auto pb-nav bg-gray-50">
      {/* Header */}
      <div className="safe-top bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-gray-900 font-bold text-xl">Recipes</h1>
          <button
            onClick={() => setView('create')}
            className="flex items-center gap-1.5 px-3 py-2 bg-green-app text-white font-semibold text-sm rounded-xl"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                 className="w-4 h-4"><path d="M12 5v14M5 12h14"/></svg>
            New
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        {recipes.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl">👨‍🍳</span>
            <p className="text-gray-500 mt-3 text-sm">No recipes yet.</p>
            <p className="text-gray-400 text-xs mt-1">Tap New to create your first recipe.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recipes.map(recipe => {
              const totals = computeTotals(recipe);
              return (
                <div key={recipe.id} className="card">
                  <button
                    onClick={() => { setSelected({ ...recipe, ...totals }); setView('detail'); }}
                    className="w-full px-4 py-4 text-left active:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800">{recipe.name}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {recipe.ingredients?.length || 0} ingredients • {recipe.servings || 1} serving{(recipe.servings || 1) !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right ml-3 flex-shrink-0">
                        <p className="font-bold text-gray-800">{Math.round(totals.totalCalories / (recipe.servings || 1))} kcal</p>
                        <p className="text-gray-400 text-xs">per serving</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
                      <MacroTag label="P" value={totals.totalProtein / (recipe.servings || 1)} color="text-blue-600" />
                      <MacroTag label="C" value={totals.totalCarbs / (recipe.servings || 1)} color="text-orange-600" />
                      <MacroTag label="F" value={totals.totalFat / (recipe.servings || 1)} color="text-yellow-600" />
                    </div>
                  </button>
                  <div className="border-t border-gray-100 flex">
                    <button onClick={() => { setEditing(recipe); setView('create'); }}
                            className="flex-1 py-3 text-center text-gray-500 text-sm font-medium active:bg-gray-50 border-r border-gray-100">
                      Edit
                    </button>
                    <button onClick={() => deleteRecipe(recipe.id)}
                            className="flex-1 py-3 text-center text-red-500 text-sm font-medium active:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function computeTotals(recipe) {
  const ing = recipe.ingredients || [];
  return {
    totalCalories: ing.reduce((s, i) => s + (i.calories || 0) * (i.quantity || 1), 0),
    totalProtein: ing.reduce((s, i) => s + (i.protein || 0) * (i.quantity || 1), 0),
    totalCarbs: ing.reduce((s, i) => s + (i.carbs || 0) * (i.quantity || 1), 0),
    totalFat: ing.reduce((s, i) => s + (i.fat || 0) * (i.quantity || 1), 0),
    totalFiber: ing.reduce((s, i) => s + (i.fiber || 0) * (i.quantity || 1), 0),
  };
}

function MacroTag({ label, value, color }) {
  return (
    <span className={`text-xs font-medium ${color}`}>{label}: {Math.round(value)}g</span>
  );
}

function RecipeEditor({ recipe, onSave, onCancel }) {
  const { customFoods } = useStore();
  const [name, setName] = useState(recipe?.name || '');
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [ingredients, setIngredients] = useState(recipe?.ingredients || []);
  const [notes, setNotes] = useState(recipe?.notes || '');
  const [showAddIngredient, setShowAddIngredient] = useState(false);

  async function handleSave() {
    if (!name.trim()) return;
    const r = {
      id: recipe?.id || generateId(),
      name: name.trim(),
      servings,
      ingredients,
      notes,
      createdAt: recipe?.createdAt || todayStr(),
    };
    await onSave(r);
  }

  function addIngredient(food, quantity) {
    setIngredients(prev => [...prev, {
      id: generateId(),
      foodName: food.name,
      calories: food.calories,
      protein: food.protein || 0,
      carbs: food.carbs || 0,
      fat: food.fat || 0,
      fiber: food.fiber || 0,
      quantity,
      servingUnit: food.servingUnit || 'g',
    }]);
    setShowAddIngredient(false);
  }

  function removeIngredient(id) {
    setIngredients(prev => prev.filter(i => i.id !== id));
  }

  const totals = computeTotals({ ingredients });

  return (
    <div className="fixed inset-0 z-40 bg-gray-50 flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="bg-white border-b border-gray-100 flex items-center px-4 py-3">
        <button onClick={onCancel} className="text-gray-400 mr-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <h2 className="font-bold text-gray-900 flex-1">{recipe ? 'Edit Recipe' : 'New Recipe'}</h2>
        <button onClick={handleSave} disabled={!name.trim()}
                className="text-green-app font-bold text-sm disabled:opacity-40">
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="card p-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recipe Name *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                     placeholder="e.g. Dal Makhani"
                     className="w-full mt-1.5 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-green-app" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Servings</label>
              <div className="flex items-center gap-4 mt-1.5">
                <button onClick={() => setServings(s => Math.max(1, s - 1))}
                        className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 font-bold text-xl flex items-center justify-center">−</button>
                <span className="text-xl font-bold text-gray-800 flex-1 text-center">{servings}</span>
                <button onClick={() => setServings(s => s + 1)}
                        className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 font-bold text-xl flex items-center justify-center">+</button>
              </div>
            </div>
          </div>

          {/* Nutrition summary */}
          {ingredients.length > 0 && (
            <div className="card p-4 bg-green-50 border-green-100">
              <p className="text-green-app text-xs font-semibold uppercase tracking-wider mb-2">Total Nutrition</p>
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-green-app font-bold text-lg">{Math.round(totals.totalCalories)}</p>
                  <p className="text-green-700 text-xs">kcal</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-600 font-bold">{Math.round(totals.totalProtein)}g</p>
                  <p className="text-gray-400 text-xs">protein</p>
                </div>
                <div className="text-center">
                  <p className="text-orange-500 font-bold">{Math.round(totals.totalCarbs)}g</p>
                  <p className="text-gray-400 text-xs">carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-yellow-500 font-bold">{Math.round(totals.totalFat)}g</p>
                  <p className="text-gray-400 text-xs">fat</p>
                </div>
              </div>
            </div>
          )}

          {/* Ingredients */}
          <div className="card">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Ingredients</h3>
              <button onClick={() => setShowAddIngredient(true)}
                      className="text-green-app text-sm font-semibold">+ Add</button>
            </div>
            {ingredients.length === 0 ? (
              <p className="px-4 py-6 text-gray-400 text-sm text-center">No ingredients yet</p>
            ) : (
              ingredients.map(ing => (
                <div key={ing.id} className="flex items-center px-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">{ing.foodName}</p>
                    <p className="text-gray-400 text-xs">{ing.quantity} {ing.servingUnit} • {Math.round(ing.calories * ing.quantity)} kcal</p>
                  </div>
                  <button onClick={() => removeIngredient(ing.id)}
                          className="text-red-400 active:text-red-600 ml-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="card p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
                      rows={3} placeholder="Cooking instructions, tips..."
                      className="w-full mt-1.5 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-green-app resize-none" />
          </div>
        </div>
      </div>

      {showAddIngredient && (
        <AddIngredientSheet
          customFoods={customFoods}
          onAdd={addIngredient}
          onClose={() => setShowAddIngredient(false)}
        />
      )}
    </div>
  );
}

function AddIngredientSheet({ customFoods, onAdd, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);

  async function doSearch(q) {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try { setResults(await searchAllFoods(q, customFoods)); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    const t = setTimeout(() => doSearch(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  if (selected) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="bg-white border-b border-gray-100 flex items-center px-4 py-3">
          <button onClick={() => setSelected(null)} className="text-gray-400 mr-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h3 className="font-bold text-gray-900">{selected.name}</h3>
        </div>
        <div className="p-6 flex-1">
          <p className="text-gray-500 text-sm mb-2">Quantity ({selected.servingUnit})</p>
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setQty(q => Math.max(0.25, parseFloat((q - 0.25).toFixed(2))))}
                    className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 font-bold text-2xl flex items-center justify-center">−</button>
            <input type="number" inputMode="decimal" value={qty}
                   onChange={e => setQty(parseFloat(e.target.value) || 1)}
                   className="flex-1 text-3xl font-bold text-gray-900 text-center border-0 outline-none" />
            <button onClick={() => setQty(q => parseFloat((q + 0.25).toFixed(2)))}
                    className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 font-bold text-2xl flex items-center justify-center">+</button>
          </div>
          <p className="text-gray-400 text-sm text-center mb-6">
            ≈ {Math.round(selected.calories * qty)} kcal
          </p>
          <button onClick={() => onAdd(selected, qty)}
                  className="w-full py-4 bg-green-app text-white font-bold rounded-2xl text-base">
            Add Ingredient
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={onClose} className="text-gray-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                 placeholder="Search ingredient..." autoFocus
                 className="flex-1 bg-transparent text-sm text-gray-800 outline-none" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading && <p className="px-4 py-3 text-gray-400 text-sm">Searching...</p>}
        {results.map(food => (
          <button key={food.id || food.name} onClick={() => { setSelected(food); setQty(food.defaultServing || 1); }}
                  className="w-full flex items-center px-4 py-3 border-b border-gray-50 text-left active:bg-gray-50">
            <div className="flex-1">
              <p className="text-gray-800 text-sm font-medium">{food.name}</p>
              <p className="text-gray-400 text-xs">{food.defaultServing} {food.servingUnit}</p>
            </div>
            <p className="text-gray-700 text-sm font-semibold">{Math.round(food.calories)} kcal</p>
          </button>
        ))}
        {query.length < 2 && !loading && (
          <p className="px-4 py-8 text-gray-400 text-sm text-center">Type to search for ingredients</p>
        )}
      </div>
    </div>
  );
}

function RecipeDetail({ recipe, onBack, onEdit, onLog }) {
  const [meal, setMeal] = useState('Lunch');
  const [servings, setServings] = useState(1);

  const factor = servings / (recipe.servings || 1);

  return (
    <div className="fixed inset-0 z-40 bg-gray-50 flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="bg-white border-b border-gray-100 flex items-center px-4 py-3">
        <button onClick={onBack} className="text-gray-400 mr-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h2 className="font-bold text-gray-900 flex-1 truncate">{recipe.name}</h2>
        <button onClick={onEdit} className="text-green-app text-sm font-semibold">Edit</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="card p-4">
          <div className="flex justify-around">
            <NutrStat label="Calories" value={Math.round(recipe.totalCalories * factor)} unit="kcal" bold />
            <NutrStat label="Protein" value={Math.round(recipe.totalProtein * factor)} unit="g" />
            <NutrStat label="Carbs" value={Math.round(recipe.totalCarbs * factor)} unit="g" />
            <NutrStat label="Fat" value={Math.round(recipe.totalFat * factor)} unit="g" />
          </div>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Ingredients</h3>
          <div className="space-y-2">
            {(recipe.ingredients || []).map(ing => (
              <div key={ing.id} className="flex justify-between">
                <span className="text-gray-700 text-sm">{ing.foodName}</span>
                <span className="text-gray-400 text-sm">{ing.quantity} {ing.servingUnit}</span>
              </div>
            ))}
          </div>
        </div>

        {recipe.notes && (
          <div className="card p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
            <p className="text-gray-600 text-sm">{recipe.notes}</p>
          </div>
        )}

        <div className="card p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Log to</label>
            <select value={meal} onChange={e => setMeal(e.target.value)}
                    className="w-full mt-1.5 border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-700">
              {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Servings</label>
            <div className="flex items-center gap-3 mt-1.5">
              <button onClick={() => setServings(s => Math.max(0.25, parseFloat((s - 0.25).toFixed(2))))}
                      className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 font-bold text-xl flex items-center justify-center">−</button>
              <span className="flex-1 text-xl font-bold text-gray-900 text-center">{servings}</span>
              <button onClick={() => setServings(s => parseFloat((s + 0.25).toFixed(2)))}
                      className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 font-bold text-xl flex items-center justify-center">+</button>
            </div>
          </div>
          <button onClick={() => onLog(meal, servings)}
                  className="w-full py-4 bg-green-app text-white font-bold rounded-2xl">
            Log Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

function NutrStat({ label, value, unit, bold }) {
  return (
    <div className="text-center">
      <p className={`${bold ? 'text-xl text-green-app' : 'text-base text-gray-700'} font-bold`}>{value}</p>
      <p className="text-gray-400 text-xs">{unit}</p>
      <p className="text-gray-400 text-xs mt-0.5">{label}</p>
    </div>
  );
}

