import { useState } from 'react';
import useStore from '../../store/useStore.js';
import { todayStr } from '../../utils/calculations.js';
import FoodSearch from './FoodSearch.jsx';
import ManualEntry from './ManualEntry.jsx';

const MEALS = [
  { id: 'Breakfast', icon: '🌅' },
  { id: 'Lunch', icon: '☀️' },
  { id: 'Dinner', icon: '🌙' },
  { id: 'Snacks', icon: '🍎' },
];

export default function LogFood({ defaultMeal = null, onDone = null }) {
  const { foodEntries, deleteFoodEntry } = useStore();
  const [activeMeal, setActiveMeal] = useState(null);
  const [activeTab, setActiveTab] = useState('search');

  const today = todayStr();
  const todayEntries = foodEntries.filter(e => e.date === today);

  function mealEntries(meal) {
    return todayEntries.filter(e => e.mealType === meal);
  }

  function handleOpenMeal(meal, tab = 'search') {
    setActiveMeal(meal);
    setActiveTab(tab);
  }

  function handleClose() {
    setActiveMeal(null);
    if (onDone) onDone();
  }

  // If called from Dashboard with a specific meal pre-opened
  if (defaultMeal && !activeMeal) {
    return (
      <LogFoodSheet
        meal={defaultMeal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onDone || (() => {})}
      />
    );
  }

  if (activeMeal) {
    return (
      <LogFoodSheet
        meal={activeMeal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={() => setActiveMeal(null)}
      />
    );
  }

  return (
    <div className="h-screen overflow-y-auto pb-nav bg-gray-50">
      {/* Header */}
      <div className="safe-top bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-gray-900 font-bold text-xl">Log Food</h1>
          <p className="text-gray-400 text-xs mt-0.5">Tap a meal to add food</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {MEALS.map(({ id, icon }) => {
          const entries = mealEntries(id);
          const calories = entries.reduce((s, e) => s + (e.calories || 0), 0);

          return (
            <div key={id} className="card">
              <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100">
                <span className="text-xl">{icon}</span>
                <h2 className="font-semibold text-gray-800 flex-1">{id}</h2>
                <span className="text-gray-500 text-sm">{Math.round(calories)} kcal</span>
                <button
                  onClick={() => handleOpenMeal(id)}
                  className="w-8 h-8 rounded-full bg-green-50 text-green-app flex items-center justify-center border border-green-200 active:bg-green-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                       className="w-4 h-4"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>

              {entries.length === 0 ? (
                <p className="px-4 py-3 text-gray-400 text-sm">No foods logged yet</p>
              ) : (
                <div>
                  {entries.map(entry => (
                    <div key={entry.id}
                         className="flex items-center px-4 py-2.5 border-b border-gray-50 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-sm font-medium truncate">{entry.foodName}</p>
                        <p className="text-gray-400 text-xs">
                          {entry.servingSize} {entry.servingUnit} •
                          P:{Math.round(entry.protein)}g C:{Math.round(entry.carbs)}g F:{Math.round(entry.fat)}g
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                        <span className="text-gray-700 text-sm font-semibold">{Math.round(entry.calories)} kcal</span>
                        <button
                          onClick={() => deleteFoodEntry(entry.id)}
                          className="text-gray-300 hover:text-red-400 active:text-red-500 p-1"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                               className="w-4 h-4"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LogFoodSheet({ meal, activeTab, setActiveTab, onClose }) {
  const TABS = [
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'manual', label: 'Manual', icon: '✏️' },
    { id: 'quick', label: 'Quick Add', icon: '⚡' },
  ];

  return (
    <div className="fixed inset-0 z-40 bg-gray-50 flex flex-col"
         style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center px-4 py-3">
          <button onClick={onClose} className="mr-3 text-gray-400 p-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                 className="w-5 h-5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h2 className="font-bold text-gray-900 flex-1">
            Log to {meal}
          </h2>
        </div>

        <div className="flex px-4 gap-1 pb-2">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === t.id
                  ? 'bg-green-app text-white shadow-sm'
                  : 'text-gray-500 bg-gray-100'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-nav">
        {activeTab === 'search' && <FoodSearch meal={meal} onSaved={onClose} />}
        {activeTab === 'manual' && <ManualEntry meal={meal} onSaved={onClose} />}
        {activeTab === 'quick' && <QuickAdd meal={meal} onSaved={onClose} />}
      </div>
    </div>
  );
}

function QuickAdd({ meal, onSaved }) {
  const { addFoodEntry } = useStore();
  const [calories, setCalories] = useState('');

  async function handleAdd() {
    const cal = parseFloat(calories);
    if (!isNaN(cal) && cal > 0) {
      await addFoodEntry({
        mealType: meal,
        foodName: 'Quick Add',
        calories: cal,
        protein: 0, carbs: 0, fat: 0, fiber: 0,
        servingSize: 1, servingUnit: 'serving',
        source: 'manual',
      });
      onSaved();
    }
  }

  return (
    <div className="p-6">
      <p className="text-gray-600 text-sm mb-4">Add calories without specifying a food</p>
      <input
        type="number" inputMode="numeric" placeholder="Calories (kcal)"
        value={calories} onChange={e => setCalories(e.target.value)}
        autoFocus
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-2xl font-bold text-center mb-6 focus:outline-none focus:border-green-app"
      />
      <button
        onClick={handleAdd}
        disabled={!calories || parseFloat(calories) <= 0}
        className="w-full py-4 bg-green-app text-white font-bold rounded-2xl text-lg disabled:opacity-40">
        Add to {meal}
      </button>
    </div>
  );
}
