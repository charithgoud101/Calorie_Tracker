import { useMemo, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine, CartesianGrid,
} from 'recharts';
import useStore from '../../store/useStore.js';
import {
  todayStr, daysAgoStr, formatDate, formatDateShort,
  computeStreak, computeLongestStreak, dateStr,
} from '../../utils/calculations.js';

const RANGES = ['1W', '1M', '3M', 'All'];

export default function Progress() {
  const { foodEntries, weightLogs, dailyLog, profile } = useStore();
  const [weightRange, setWeightRange] = useState('1M');
  const [calRange, setCalRange] = useState('1W');

  const target = profile?.dailyCalorieTarget || 2000;

  // ---- Daily calorie data ----
  const calData = useMemo(() => {
    const days = calRange === '1W' ? 7 : 30;
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = daysAgoStr(i);
      const dayEntries = foodEntries.filter(e => e.date === d);
      const total = dayEntries.reduce((s, e) => s + (e.calories || 0), 0);
      result.push({ date: d, label: formatDateShort(d), calories: Math.round(total) });
    }
    return result;
  }, [foodEntries, calRange]);

  // ---- Weight data ----
  const weightData = useMemo(() => {
    const days = { '1W': 7, '1M': 30, '3M': 90, 'All': null }[weightRange];
    const cutoff = days ? daysAgoStr(days) : null;
    return weightLogs
      .filter(w => !cutoff || w.date >= cutoff)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(w => ({ date: w.date, label: formatDate(w.date), weight: w.weightKg }));
  }, [weightLogs, weightRange]);

  // ---- 7-day moving average for weight ----
  const weightWithAvg = useMemo(() => {
    return weightData.map((d, i) => {
      const window = weightData.slice(Math.max(0, i - 6), i + 1);
      const avg = window.reduce((s, x) => s + x.weight, 0) / window.length;
      return { ...d, avg: parseFloat(avg.toFixed(2)) };
    });
  }, [weightData]);

  // ---- Macro data (7 days) ----
  const macroData = useMemo(() => {
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = daysAgoStr(i);
      const day = foodEntries.filter(e => e.date === d);
      result.push({
        date: d,
        label: formatDateShort(d),
        protein: Math.round(day.reduce((s, e) => s + (e.protein || 0), 0)),
        carbs: Math.round(day.reduce((s, e) => s + (e.carbs || 0), 0)),
        fat: Math.round(day.reduce((s, e) => s + (e.fat || 0), 0)),
      });
    }
    return result;
  }, [foodEntries]);

  // ---- Streak stats ----
  const streak = useMemo(() => computeStreak(foodEntries), [foodEntries]);
  const longestStreak = useMemo(() => computeLongestStreak(foodEntries), [foodEntries]);
  const totalDays = useMemo(() => new Set(foodEntries.map(e => e.date)).size, [foodEntries]);

  // ---- Weekly stats ----
  const weeklyStats = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) days.push(daysAgoStr(i));
    const week = foodEntries.filter(e => days.includes(e.date));
    const logged = new Set(week.map(e => e.date)).size;
    if (logged === 0) return null;
    return {
      avgCalories: Math.round(week.reduce((s, e) => s + e.calories, 0) / logged),
      avgProtein: Math.round(week.reduce((s, e) => s + e.protein, 0) / logged),
      avgCarbs: Math.round(week.reduce((s, e) => s + e.carbs, 0) / logged),
      daysLogged: logged,
    };
  }, [foodEntries]);

  // ---- Deficit/Surplus ----
  const weekBalance = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) days.push(daysAgoStr(i));
    const week = foodEntries.filter(e => days.includes(e.date));
    const loggedDays = new Set(week.map(e => e.date)).size;
    if (!loggedDays) return null;
    const consumed = week.reduce((s, e) => s + e.calories, 0);
    const budgeted = target * loggedDays;
    const diff = consumed - budgeted;
    return { diff, kg: Math.abs(diff) / 7700 };
  }, [foodEntries, target]);

  // ---- Insights ----
  const insights = useMemo(() => {
    const cutoff = daysAgoStr(14);
    const recent = foodEntries.filter(e => e.date >= cutoff);
    const result = [];

    const freq = {};
    recent.forEach(e => { freq[e.foodName] = (freq[e.foodName] || 0) + 1; });
    const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
    if (top) result.push(`Most logged food: "${top[0]}" (${top[1]}× in 2 weeks)`);

    const dayMap = {};
    recent.forEach(e => {
      const d = new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
      dayMap[d] = (dayMap[d] || 0) + e.calories;
    });
    const topDay = Object.entries(dayMap).sort((a, b) => b[1] - a[1])[0];
    if (topDay) result.push(`Highest calories on ${topDay[0]}s`);

    if (result.length === 0) result.push('Keep logging to see personalized insights!');
    return result;
  }, [foodEntries]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-auto pb-nav bg-gray-50">
      {/* Header */}
      <div className="safe-top bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-gray-900 font-bold text-xl">Progress</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Streak stats */}
        <div className="card overflow-hidden">
          <div className="flex divide-x divide-gray-100">
            <StatBox label="Current Streak" value={streak} unit="days" color="text-orange-500" />
            <StatBox label="Longest Streak" value={longestStreak} unit="days" color="text-blue-500" />
            <StatBox label="Total Days" value={totalDays} unit="logged" color="text-green-app" />
          </div>
        </div>

        {/* Weight Chart */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800">Weight</h2>
            <RangePicker value={weightRange} onChange={setWeightRange} options={RANGES} />
          </div>
          {weightData.length < 2 ? (
            <EmptyChart label="Log your weight on the Home screen to see trends" />
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={weightWithAvg} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
                         domain={['auto', 'auto']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="weight" stroke="#1B4332" strokeWidth={2}
                        dot={{ r: 3, fill: '#1B4332' }} name="Weight (kg)" />
                  <Line type="monotone" dataKey="avg" stroke="#F97316" strokeWidth={2}
                        dot={false} strokeDasharray="4 2" name="7-day avg" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                <ChartLegend name="Actual" color="#1B4332" />
                <ChartLegend name="7-day avg" color="#F97316" dashed />
                {profile?.goalWeight && (
                  <span className="text-gray-400 text-xs ml-auto">Goal: {profile.goalWeight} kg</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Calorie History */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800">Calories</h2>
            <RangePicker value={calRange} onChange={setCalRange} options={['1W', '1M']} />
          </div>
          {calData.every(d => d.calories === 0) ? (
            <EmptyChart label="Log food to see your calorie history" />
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={calData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={target} stroke="#F97316" strokeDasharray="4 2"
                               label={{ value: 'Target', position: 'insideTopRight', fontSize: 10, fill: '#F97316' }} />
                <Bar dataKey="calories" name="Calories" radius={[4, 4, 0, 0]}
                     fill="#1B4332" opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Macro History */}
        <div className="card p-4">
          <h2 className="font-semibold text-gray-800 mb-3">Macros (7 days)</h2>
          {macroData.every(d => d.protein + d.carbs + d.fat === 0) ? (
            <EmptyChart label="Log food to see macro breakdowns" />
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={macroData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="protein" name="Protein (g)" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="carbs" name="Carbs (g)" fill="#F97316" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="fat" name="Fat (g)" fill="#EAB308" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                <ChartLegend name="Protein" color="#3B82F6" />
                <ChartLegend name="Carbs" color="#F97316" />
                <ChartLegend name="Fat" color="#EAB308" />
              </div>
            </>
          )}
        </div>

        {/* Weekly Summary */}
        {weeklyStats && (
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 mb-3">This Week</h2>
            <div className="grid grid-cols-2 gap-3">
              <SummaryBox label="Avg Calories" value={weeklyStats.avgCalories} unit="kcal" />
              <SummaryBox label="Avg Protein" value={weeklyStats.avgProtein} unit="g" />
              <SummaryBox label="Avg Carbs" value={weeklyStats.avgCarbs} unit="g" />
              <SummaryBox label="Days Logged" value={`${weeklyStats.daysLogged}/7`} unit="" />
            </div>
          </div>
        )}

        {/* Deficit/Surplus */}
        {weekBalance && (
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Weekly Balance</h2>
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">{weekBalance.diff < 0 ? 'Deficit' : 'Surplus'}</p>
                <p className={`text-2xl font-bold ${weekBalance.diff < 0 ? 'text-green-app' : 'text-red-500'}`}>
                  {Math.abs(Math.round(weekBalance.diff))} kcal
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Est. weight change</p>
                <p className={`text-2xl font-bold ${weekBalance.diff < 0 ? 'text-green-app' : 'text-orange-500'}`}>
                  {weekBalance.diff < 0 ? '-' : '+'}{weekBalance.kg.toFixed(2)} kg
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💡</span>
            <h2 className="font-semibold text-gray-800">Insights</h2>
          </div>
          <div className="space-y-2">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-app mt-0.5">→</span>
                <p className="text-gray-600 text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, unit, color }) {
  return (
    <div className="flex-1 py-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-gray-400 text-xs">{unit}</p>
      <p className="text-gray-500 text-xs mt-0.5">{label}</p>
    </div>
  );
}

function SummaryBox({ label, value, unit }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-gray-800 font-bold">{value}{unit ? ` ${unit}` : ''}</p>
      <p className="text-gray-400 text-xs mt-0.5">{label}</p>
    </div>
  );
}

function RangePicker({ value, onChange, options }) {
  return (
    <div className="flex gap-1">
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  value === opt ? 'bg-green-app text-white' : 'bg-gray-100 text-gray-500'
                }`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function EmptyChart({ label }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <p className="text-gray-400 text-sm text-center px-4">{label}</p>
    </div>
  );
}

function ChartLegend({ name, color, dashed }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        {dashed && <div className="w-2 h-px" style={{ backgroundColor: color }} />}
        {dashed && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />}
      </div>
      <span className="text-gray-500 text-xs">{name}</span>
    </div>
  );
}
