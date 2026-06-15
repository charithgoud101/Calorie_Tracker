import { useState } from 'react';
import useStore from '../../store/useStore.js';

const SERVING_UNITS = ['g', 'ml', 'katori', 'piece', 'roti', 'bowl', 'cup', 'glass', 'serving', 'slice'];

export default function ManualEntry({ meal, onSaved }) {
  const { addFoodEntry, saveCustomFood } = useStore();

  const [form, setForm] = useState({
    foodName: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    servingSize: '1',
    servingUnit: 'piece',
  });
  const [saveAsCustom, setSaveAsCustom] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const estimated = (() => {
    const p = parseFloat(form.protein) || 0;
    const c = parseFloat(form.carbs) || 0;
    const f = parseFloat(form.fat) || 0;
    return 4 * p + 4 * c + 9 * f;
  })();

  const effectiveCals = parseFloat(form.calories) || estimated;
  const canSave = form.foodName.trim().length > 0 && (form.calories || estimated > 0);

  async function handleSave() {
    if (!canSave) return;
    const cal = effectiveCals;

    await addFoodEntry({
      mealType: meal,
      foodName: form.foodName.trim(),
      calories: cal,
      protein: parseFloat(form.protein) || 0,
      carbs: parseFloat(form.carbs) || 0,
      fat: parseFloat(form.fat) || 0,
      fiber: parseFloat(form.fiber) || 0,
      servingSize: parseFloat(form.servingSize) || 1,
      servingUnit: form.servingUnit,
      source: 'manual',
    });

    if (saveAsCustom) {
      await saveCustomFood({
        name: form.foodName.trim(),
        calories: cal,
        protein: parseFloat(form.protein) || 0,
        carbs: parseFloat(form.carbs) || 0,
        fat: parseFloat(form.fat) || 0,
        fiber: parseFloat(form.fiber) || 0,
        defaultServing: parseFloat(form.servingSize) || 1,
        servingUnit: form.servingUnit,
      });
    }

    onSaved();
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Food name + serving */}
        <div className="card p-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Food Name *</label>
            <input
              type="text"
              value={form.foodName}
              onChange={e => update('foodName', e.target.value)}
              placeholder="e.g. Dal Makhani"
              autoFocus
              className="w-full mt-1.5 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:border-green-app"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Serving Size</label>
              <input
                type="number" inputMode="decimal"
                value={form.servingSize} onChange={e => update('servingSize', e.target.value)}
                className="w-full mt-1.5 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-green-app"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</label>
              <select value={form.servingUnit} onChange={e => update('servingUnit', e.target.value)}
                      className="w-full mt-1.5 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:border-green-app">
                {SERVING_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Calories */}
        <div className="card p-4">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Calories (kcal)</label>
          <div className="flex items-center gap-3 mt-1.5">
            <input
              type="number" inputMode="decimal"
              value={form.calories} onChange={e => update('calories', e.target.value)}
              placeholder="0"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-lg font-bold focus:outline-none focus:border-green-app"
            />
            {!form.calories && estimated > 0 && (
              <button onClick={() => update('calories', String(Math.round(estimated)))}
                      className="px-3 py-2 bg-green-50 text-green-app text-sm font-semibold rounded-xl border border-green-200 whitespace-nowrap">
                Use {Math.round(estimated)}
              </button>
            )}
          </div>
          {!form.calories && estimated > 0 && (
            <p className="text-gray-400 text-xs mt-1">Estimated from macros: {Math.round(estimated)} kcal</p>
          )}
        </div>

        {/* Macros */}
        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Macros (optional)</p>
          <div className="space-y-3">
            {[
              { key: 'protein', label: 'Protein', color: 'text-blue-600', bg: 'bg-blue-50' },
              { key: 'carbs', label: 'Carbohydrates', color: 'text-orange-600', bg: 'bg-orange-50' },
              { key: 'fat', label: 'Fat', color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { key: 'fiber', label: 'Fiber', color: 'text-green-600', bg: 'bg-green-50' },
            ].map(({ key, label, color, bg }) => (
              <div key={key} className="flex items-center gap-3">
                <span className={`w-24 text-sm font-medium ${color}`}>{label}</span>
                <input
                  type="number" inputMode="decimal"
                  value={form[key]} onChange={e => update(key, e.target.value)}
                  placeholder="0"
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 text-right focus:outline-none focus:border-green-app"
                />
                <span className="text-gray-400 text-sm w-5">g</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save as custom */}
        <label className="flex items-center gap-3 card p-4 cursor-pointer">
          <input type="checkbox" checked={saveAsCustom} onChange={e => setSaveAsCustom(e.target.checked)}
                 className="w-5 h-5 accent-green-700 rounded" />
          <span className="text-gray-700 text-sm font-medium">Save as Custom Food</span>
        </label>

        {/* Submit */}
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full py-4 bg-green-app text-white font-bold rounded-2xl text-base shadow-sm disabled:opacity-40 active:opacity-90 mt-2"
        >
          Add to {meal}
        </button>

        <div style={{ height: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  );
}
