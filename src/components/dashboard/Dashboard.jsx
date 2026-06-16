import { useState, useMemo } from 'react';
import useStore from '../../store/useStore.js';
import { todayStr, computeStreak } from '../../utils/calculations.js';
import LogFood from '../logfood/LogFood.jsx';

const MEAL_TYPES = [
  { id: 'Breakfast', icon: '🌅', color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'Lunch', icon: '☀️', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'Dinner', icon: '🌙', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'Snacks', icon: '🍎', color: 'text-green-600', bg: 'bg-green-50' },
];

// Approx kcal burned per step based on body weight
function stepsToCalories(steps, weightKg = 70) {
  return Math.round(steps * 0.04 * (weightKg / 70));
}

export default function Dashboard() {
  const {
    profile, foodEntries, dailyLog, weightLogs,
    darkMode, toggleDarkMode,
    addWater, addSteps, setSteps,
  } = useStore();
  const [expandedMeals, setExpandedMeals] = useState(new Set());
  const [logMeal, setLogMeal] = useState(null);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showStepsModal, setShowStepsModal] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [customWater, setCustomWater] = useState('');
  const [stepsInput, setStepsInput] = useState('');

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
    steps: profile?.dailyStepsTarget || 10000,
  };

  const waterMl = dailyLog?.waterMl || 0;
  const steps = dailyLog?.steps || 0;
  const stepsCals = stepsToCalories(steps, profile?.weightKg || 70);
  const remaining = targets.calories - totals.calories + stepsCals;
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

  async function handleLogWeight() {
    const w = parseFloat(weightInput);
    if (!isNaN(w) && w > 0) {
      await addWeightLog(w);
      setWeightInput('');
      setShowWeightModal(false);
    }
  }

  async function handleSetSteps() {
    const s = parseInt(stepsInput);
    if (!isNaN(s) && s >= 0) {
      await setSteps(s);
      setStepsInput('');
      setShowStepsModal(false);
    }
  }

  const remainingColor =
    remaining > 200 ? 'text-green-app' : remaining > 0 ? 'text-orange-500' : 'text-red-500';

  // Ring track colour adapts to dark mode
  const ringTrack = darkMode ? '#374151' : '#F3F4F6';

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
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd"/>
                </svg>
              )}
            </button>
            {/* Streak */}
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full">
              <span className="text-lg">🔥</span>
              <span className="text-orange-600 font-bold text-sm">{streak} day{streak !== 1 ? 's' : ''}</span>
            </div>
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

          <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <CaloriePill label="Goal" value={targets.calories} color="text-gray-700" />
            <span className="text-gray-300 self-center text-lg">−</span>
            <CaloriePill label="Eaten" value={Math.round(totals.calories)} color="text-red-500" />
            {stepsCals > 0 && (
              <>
                <span className="text-gray-300 self-center text-lg">+</span>
                <CaloriePill label="Burned" value={stepsCals} color="text-green-600" />
              </>
            )}
          </div>
        </div>

        {/* Macro + Fiber Rings */}
        <div className="card p-4">
          <div className="grid grid-cols-4 gap-1">
            <MacroRing label="Protein" current={totals.protein} target={targets.protein} color="#3B82F6" trackColor={ringTrack} />
            <MacroRing label="Carbs"   current={totals.carbs}   target={targets.carbs}   color="#F97316" trackColor={ringTrack} />
            <MacroRing label="Fat"     current={totals.fat}     target={targets.fat}     color="#EAB308" trackColor={ringTrack} />
            <MacroRing label="Fiber"   current={totals.fiber}   target={targets.fiber}   color="#10B981" trackColor={ringTrack} />
          </div>
        </div>

        {/* Steps Card */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">👟</span>
              <span className="font-semibold text-gray-800">Steps</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 text-sm">{steps.toLocaleString()} / {targets.steps.toLocaleString()}</span>
              {stepsCals > 0 && (
                <p className="text-green-600 text-xs font-medium">~{stepsCals} kcal burned</p>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (steps / targets.steps) * 100)}%` }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[1000, 5000, 10000].map(amt => (
              <button key={amt} onClick={() => addSteps(amt)}
                      className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-full border border-green-200 active:bg-green-100">
                +{(amt / 1000).toFixed(0)}k
              </button>
            ))}
            <button onClick={() => setShowStepsModal(true)}
                    className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-full border border-green-200 active:bg-green-100">
              Set Total
            </button>
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
              <button key={amt} onClick={() => addWater(amt)}
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
        {MEAL_TYPES.map(({ id, icon }) => {
          const expanded = expandedMeals.has(id);
          const entries = mealEntries(id);
          const cal = mealCalories(id);
          return (
            <div key={id} className="card overflow-hidden">
              <button
                onClick={() => toggleMeal(id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50"
              >
                <span className="text-xl w-7 text-center">{icon}</span>
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
            if (!isNaN(amt) && amt > 0) { addWater(amt); setCustomWater(''); setShowWaterModal(false); }
          }}
                  className="w-full py-3 bg-green-app text-white font-semibold rounded-xl">
            Add
          </button>
        </Modal>
      )}

      {/* Steps Modal */}
      {showStepsModal && (
        <Modal title="Set Step Count" onClose={() => { setShowStepsModal(false); setStepsInput(''); }}>
          <p className="text-gray-500 text-sm mb-3">Enter your total steps for today</p>
          <input
            type="number" inputMode="numeric" placeholder="e.g. 8500"
            value={stepsInput} onChange={e => setStepsInput(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base mb-4 focus:outline-none focus:border-green-app"
            autoFocus
          />
          <button onClick={handleSetSteps}
                  className="w-full py-3 bg-green-app text-white font-semibold rounded-xl">
            Save
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

function MacroRing({ label, current, target, color, trackColor }) {
  const progress = Math.min(current / Math.max(target, 1), 1);
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
          <circle cx="32" cy="32" r={radius} fill="none" stroke={trackColor || '#F3F4F6'} strokeWidth="6" />
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
          <span className="text-xs font-bold text-gray-800">{Math.round(current)}g</span>
        </div>
      </div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="text-gray-400 text-[10px]">{target}g</p>
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
        <p className="text-gray-400 text-xs">
          {entry.servingSize} {entry.servingUnit}
          {(entry.protein > 0 || entry.carbs > 0) && (
            <span> • P:{Math.round(entry.protein)}g C:{Math.round(entry.carbs)}g F:{Math.round(entry.fat)}g</span>
          )}
        </p>
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
