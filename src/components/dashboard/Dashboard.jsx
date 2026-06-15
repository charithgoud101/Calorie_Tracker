import { useState, useMemo } from 'react';
import useStore from '../../store/useStore.js';
import { todayStr, computeStreak, dateStr } from '../../utils/calculations.js';
import LogFood from '../logfood/LogFood.jsx';

const MEAL_TYPES = [
  { id: 'Breakfast', icon: '🌅', color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'Lunch', icon: '☀️', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'Dinner', icon: '🌙', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'Snacks', icon: '🍎', color: 'text-green-600', bg: 'bg-green-50' },
];

export default function Dashboard() {
  const { profile, foodEntries, dailyLog, weightLogs, setActiveTab, addWater } = useStore();
  const [expandedMeals, setExpandedMeals] = useState(new Set());
  const [logMeal, setLogMeal] = useState(null);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [customWater, setCustomWater] = useState('');

  const today = todayStr();
  const todayEntries = useMemo(() => foodEntries.filter(e => e.date === today), [foodEntries, today]);

  const totals = useMemo(() => todayEntries.reduce(
    (acc, e) => ({
      calories: acc.calories + (e.calories || 0),
      protein: acc.protein + (e.protein || 0),
      carbs: acc.carbs + (e.carbs || 0),
      fat: acc.fat + (e.fat || 0),
      fiber: acc.fiber + (e.fiber || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  ), [todayEntries]);

  const targets = {
    calories: profile?.dailyCalorieTarget || 2000,
    protein: profile?.dailyProteinTarget || 150,
    carbs: profile?.dailyCarbsTarget || 250,
    fat: profile?.dailyFatTarget || 65,
    fiber: profile?.dailyFiberTarget || 30,
    water: profile?.dailyWaterTarget || 2500,
  };

  const remaining = targets.calories - totals.calories;
  const waterMl = dailyLog?.waterMl || 0;
  const streak = useMemo(() => computeStreak(foodEntries), [foodEntries]);
  const latestWeight = useMemo(() => {
    const sorted = [...weightLogs].sort((a, b) => b.date.localeCompare(a.date));
    return sorted[0]?.weightKg;
  }, [weightLogs]);

  const { addWeightLog } = useStore();

  function toggleMeal(meal) {
    setExpandedMeals(prev => {
      const next = new Set(prev);
      if (next.has(meal)) next.delete(meal); else next.add(meal);
      return next;
    });
  }

  function mealEntries(meal) {
    return todayEntries.filter(e => e.mealType === meal);
  }

  function mealCalories(meal) {
    return mealEntries(meal).reduce((s, e) => s + (e.calories || 0), 0);
  }

  async function handleAddWater(amount) {
    await addWater(amount);
  }

  async function handleLogWeight() {
    const w = parseFloat(weightInput);
    if (!isNaN(w) && w > 0) {
      await addWeightLog(w);
      setWeightInput('');
      setShowWeightModal(false);
    }
  }

  const remainingColor =
    remaining > 200 ? 'text-green-app' : remaining > 0 ? 'text-orange-500' : 'text-red-500';

  if (logMeal !== null) {
    return <LogFood defaultMeal={logMeal} onDone={() => setLogMeal(null)} />;
  }

  return (
    <div className="h-screen overflow-y-auto pb-nav bg-gray-50">
      {/* Header */}
      <div className="safe-top bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">Good {greeting()},</p>
            <h1 className="text-gray-900 font-bold text-lg leading-tight">
              {profile?.name || 'there'} 👋
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full">
            <span className="text-lg">🔥</span>
            <span className="text-orange-600 font-bold text-sm">{streak} day{streak !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Calorie Card */}
        <div className="card p-5">
          <p className="text-gray-500 text-sm text-center mb-1">Remaining</p>
          <p className={`text-6xl font-bold text-center tabular-nums ${remainingColor}`}>
            {Math.round(remaining)}
          </p>
          <p className="text-gray-400 text-sm text-center mt-1">kcal</p>

          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
            <CaloriePill label="Goal" value={targets.calories} color="text-gray-700" />
            <span className="text-gray-300 self-center">−</span>
            <CaloriePill label="Eaten" value={Math.round(totals.calories)} color="text-red-500" />
          </div>
        </div>

        {/* Macro Rings */}
        <div className="card p-4">
          <div className="flex justify-around">
            <MacroRing label="Protein" current={totals.protein} target={targets.protein} color="#3B82F6" />
            <MacroRing label="Carbs" current={totals.carbs} target={targets.carbs} color="#F97316" />
            <MacroRing label="Fat" current={totals.fat} target={targets.fat} color="#EAB308" />
          </div>
        </div>

        {/* Water Card */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">💧</span>
              <span className="font-semibold text-gray-800">Water</span>
            </div>
            <span className="text-gray-500 text-sm">{waterMl} / {targets.water} ml</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
            <div
              className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (waterMl / targets.water) * 100)}%` }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[200, 250, 500].map(amt => (
              <button key={amt} onClick={() => handleAddWater(amt)}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-200 active:bg-blue-100">
                +{amt}ml
              </button>
            ))}
            <button onClick={() => setShowWaterModal(true)}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-200 active:bg-blue-100">
              Custom
            </button>
          </div>
        </div>

        {/* Meal Cards */}
        {MEAL_TYPES.map(({ id, icon, color, bg }) => {
          const expanded = expandedMeals.has(id);
          const entries = mealEntries(id);
          const cal = mealCalories(id);
          return (
            <div key={id} className="card overflow-hidden">
              <button
                onClick={() => toggleMeal(id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50"
              >
                <span className={`text-xl w-7 text-center`}>{icon}</span>
                <span className="font-semibold text-gray-800 flex-1">{id}</span>
                <span className="text-gray-500 text-sm">{Math.round(cal)} kcal</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              {expanded && (
                <div className="border-t border-gray-100">
                  {entries.length === 0 ? (
                    <p className="px-4 py-3 text-gray-400 text-sm">No foods logged yet</p>
                  ) : (
                    entries.map(e => (
                      <FoodEntryRow key={e.id} entry={e} />
                    ))
                  )}
                  <button
                    onClick={() => setLogMeal(id)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-green-app font-medium text-sm border-t border-gray-50 active:bg-gray-50"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                         className="w-4 h-4"><path d="M12 5v14M5 12h14"/></svg>
                    Add Food to {id}
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Fiber */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <span className="font-semibold text-gray-800">Fiber</span>
            </div>
            <span className="text-gray-500 text-sm">{totals.fiber.toFixed(1)} / {targets.fiber} g</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-green-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totals.fiber / targets.fiber) * 100)}%` }}
            />
          </div>
        </div>

        {/* Weight Card */}
        <div className="card p-4 flex items-center gap-3">
          <span className="text-xl">⚖️</span>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Today's Weight</p>
            {latestWeight && (
              <p className="text-gray-500 text-sm">{latestWeight.toFixed(1)} kg</p>
            )}
          </div>
          <button onClick={() => setShowWeightModal(true)}
                  className="px-4 py-2 bg-green-50 text-green-app font-semibold text-sm rounded-xl border border-green-200 active:bg-green-100">
            Log
          </button>
        </div>
      </div>

      {/* Weight Modal */}
      {showWeightModal && (
        <Modal title="Log Weight" onClose={() => { setShowWeightModal(false); setWeightInput(''); }}>
          <input
            type="number" inputMode="decimal" placeholder="Weight (kg)"
            value={weightInput} onChange={e => setWeightInput(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base mb-4 focus:outline-none focus:border-green-app"
            autoFocus
          />
          <button onClick={handleLogWeight}
                  className="w-full py-3 bg-green-app text-white font-semibold rounded-xl">
            Save
          </button>
        </Modal>
      )}

      {/* Water Modal */}
      {showWaterModal && (
        <Modal title="Add Water" onClose={() => { setShowWaterModal(false); setCustomWater(''); }}>
          <input
            type="number" inputMode="numeric" placeholder="Amount (ml)"
            value={customWater} onChange={e => setCustomWater(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base mb-4 focus:outline-none focus:border-green-app"
            autoFocus
          />
          <button onClick={() => {
            const amt = parseInt(customWater);
            if (!isNaN(amt) && amt > 0) { handleAddWater(amt); setCustomWater(''); setShowWaterModal(false); }
          }}
                  className="w-full py-3 bg-green-app text-white font-semibold rounded-xl">
            Add
          </button>
        </Modal>
      )}
    </div>
  );
}

function CaloriePill({ label, value, color }) {
  return (
    <div className="text-center">
      <p className={`text-lg font-bold tabular-nums ${color}`}>{value}</p>
      <p className="text-gray-400 text-xs">{label}</p>
    </div>
  );
}

function MacroRing({ label, current, target, color }) {
  const progress = Math.min(current / Math.max(target, 1), 1);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 64 64" className="w-20 h-20 -rotate-90">
          <circle cx="32" cy="32" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="6" />
          <circle
            cx="32" cy="32" r={radius} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-gray-800">{Math.round(current)}g</span>
        </div>
      </div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="text-gray-400 text-[10px]">{target}g goal</p>
    </div>
  );
}

function FoodEntryRow({ entry }) {
  const { deleteFoodEntry } = useStore();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="flex items-center px-4 py-2.5 border-b border-gray-50 last:border-0 active:bg-gray-50"
         onClick={() => setShowDelete(s => !s)}>
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-sm font-medium truncate">{entry.foodName}</p>
        <p className="text-gray-400 text-xs">{entry.servingSize} {entry.servingUnit}</p>
      </div>
      <div className="flex items-center gap-3 ml-2 flex-shrink-0">
        <span className="text-gray-700 text-sm font-semibold tabular-nums">{Math.round(entry.calories)} kcal</span>
        {showDelete && (
          <button onClick={e => { e.stopPropagation(); deleteFoodEntry(entry.id); }}
                  className="text-red-500 text-xs px-2 py-1 bg-red-50 rounded-lg border border-red-200">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
         onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 mx-0 sm:mx-4"
           onClick={e => e.stopPropagation()}
           style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 text-2xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
