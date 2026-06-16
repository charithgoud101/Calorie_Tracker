import { useState } from 'react';
import useStore from '../../store/useStore.js';

const SERVING_UNITS = ['g', 'ml', 'katori', 'piece', 'roti', 'bowl', 'cup', 'glass', 'serving', 'slice'];

export default function ManualEntry({ meal, onSaved }) {
  const { addFoodEntry, saveCustomFood } = useStore();

  const [form, setForm] = useState({
    foodName: '', calories: '', protein: '', carbs: '', fat: '', fiber: '',
    servingSize: '1', servingUnit: 'piece',
  });
  const [saveAsCustom, setSaveAsCustom] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const estimated = (() => {
    const p = parseFloat(form.protein) || 0;
    const c = parseFloat(form.carbs)   || 0;
    const f = parseFloat(form.fat)     || 0;
    return 4 * p + 4 * c + 9 * f;
  })();

  const effectiveCals = parseFloat(form.calories) || estimated;
  const canSave = form.foodName.trim().length > 0 && (form.calories || estimated > 0);

  async function handleSave() {
    if (!canSave) return;
    await addFoodEntry({
      mealType: meal,
      foodName: form.foodName.trim(),
      calories: effectiveCals,
      protein:  parseFloat(form.protein)     || 0,
      carbs:    parseFloat(form.carbs)       || 0,
      fat:      parseFloat(form.fat)         || 0,
      fiber:    parseFloat(form.fiber)       || 0,
      servingSize: parseFloat(form.servingSize) || 1,
      servingUnit: form.servingUnit,
      source: 'manual',
    });
    if (saveAsCustom) {
      await saveCustomFood({
        name: form.foodName.trim(),
        calories: effectiveCals,
        protein: parseFloat(form.protein) || 0,
        carbs:   parseFloat(form.carbs)   || 0,
        fat:     parseFloat(form.fat)     || 0,
        fiber:   parseFloat(form.fiber)   || 0,
        defaultServing: parseFloat(form.servingSize) || 1,
        servingUnit: form.servingUnit,
      });
    }
    onSaved();
  }

  const inputCls = 'w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 text-base focus:outline-none focus:border-green-app dark:focus:border-violet-500 placeholder:text-gray-400 dark:placeholder:text-gray-500';

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Name + serving */}
        <div className="card p-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Food Name *</label>
            <input type="text" value={form.foodName} onChange={e => update('foodName', e.target.value)}
                   placeholder="e.g. Dal Makhani" autoFocus className={`mt-1.5 ${inputCls}`} />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Serving Size</label>
              <input type="number" inputMode="decimal" value={form.servingSize}
                     onChange={e => update('servingSize', e.target.value)}
                     className={`mt-1.5 ${inputCls}`} />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Unit</label>
              <select value={form.servingUnit} onChange={e => update('servingUnit', e.target.value)}
                      className={`mt-1.5 ${inputCls}`}>
                {SERVING_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Calories */}
        <div className="card p-4">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Calories (kcal)</label>
          <div className="flex items-center gap-3 mt-1.5">
            <input type="number" inputMode="decimal" value={form.calories}
                   onChange={e => update('calories', e.target.value)} placeholder="0"
                   className={`flex-1 text-lg font-bold ${inputCls}`} />
            {!form.calories && estimated > 0 && (
              <button onClick={() => update('calories', String(Math.round(estimated)))}
                      className="px-3 py-2 bg-green-50 dark:bg-violet-900/40 text-green-app dark:text-violet-400 text-sm font-semibold rounded-xl border border-green-200 dark:border-violet-700 whitespace-nowrap">
                Use {Math.round(estimated)}
              </button>
            )}
          </div>
          {!form.calories && estimated > 0 && (
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Estimated from macros: {Math.round(estimated)} kcal</p>
          )}
        </div>

        {/* Macros */}
        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Macros (optional)</p>
          <div className="space-y-3">
            {[
              { key: 'protein', label: 'Protein',       color: 'text-blue-600 dark:text-blue-400'   },
              { key: 'carbs',   label: 'Carbohydrates', color: 'text-orange-600 dark:text-orange-400' },
              { key: 'fat',     label: 'Fat',           color: 'text-yellow-600 dark:text-yellow-400' },
              { key: 'fiber',   label: 'Fiber',         color: 'text-green-600 dark:text-green-400'  },
            ].map(({ key, label, color }) => (
              <div key={key} className="flex items-center gap-3">
                <span className={`w-24 text-sm font-medium ${color}`}>{label}</span>
                <input type="number" inputMode="decimal" value={form[key]}
                       onChange={e => update(key, e.target.value)} placeholder="0"
                       className="flex-1 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 text-right focus:outline-none focus:border-green-app dark:focus:border-violet-500" />
                <span className="text-gray-400 dark:text-gray-500 text-sm w-5">g</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save as custom */}
        <label className="flex items-center gap-3 card p-4 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50">
          <input type="checkbox" checked={saveAsCustom} onChange={e => setSaveAsCustom(e.target.checked)}
                 className="w-5 h-5 accent-violet-600 rounded" />
          <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Save as Custom Food</span>
        </label>

        <button onClick={handleSave} disabled={!canSave}
                className="w-full py-4 bg-green-app dark:bg-violet-600 text-white font-bold rounded-2xl text-base shadow-sm disabled:opacity-40 active:opacity-90 mt-2">
          Add to {meal}
        </button>

        <div style={{ height: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  );
}
