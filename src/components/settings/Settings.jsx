import { useState } from 'react';
import useStore from '../../store/useStore.js';
import { calculateCalorieTarget, calculateMacroTargets, exportCSV } from '../../utils/calculations.js';

export default function Settings() {
  const { profile, saveProfile, foodEntries, weightLogs, clearAllData } = useStore();
  const [view, setView] = useState('main');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (view === 'edit') return <EditProfile onBack={() => setView('main')} />;
  if (view === 'targets') return <CustomTargets onBack={() => setView('main')} />;

  function handleExport() {
    const csv = exportCSV(foodEntries, weightLogs);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calorie-tracker-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleReset() {
    await clearAllData();
    setShowResetConfirm(false);
    window.location.reload();
  }

  function recalculate() {
    if (!profile) return;
    const cals = calculateCalorieTarget(profile);
    const macros = calculateMacroTargets(cals, profile.dietPreference);
    saveProfile({
      ...profile,
      dailyCalorieTarget: cals,
      dailyProteinTarget: macros.protein,
      dailyCarbsTarget: macros.carbs,
      dailyFatTarget: macros.fat,
    });
  }

  return (
    <div className="h-screen overflow-y-auto pb-nav bg-gray-50">
      <div className="safe-top bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-gray-900 font-bold text-xl">Settings</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Profile */}
        {profile && (
          <Section title="Profile">
            <div className="px-4 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{profile.name}</p>
                  <p className="text-gray-500 text-sm mt-0.5">
                    {profile.age} years • {profile.biologicalSex} • {profile.currentWeight} kg • {profile.height} cm
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{profile.goalType} • {profile.activityLevel}</p>
                </div>
                <button onClick={() => setView('edit')}
                        className="px-3 py-1.5 bg-green-50 text-green-app font-semibold text-sm rounded-xl border border-green-200">
                  Edit
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-gray-600 text-sm">Daily Target</span>
                <span className="font-bold text-gray-800">{profile.dailyCalorieTarget} kcal</span>
              </div>
              <button onClick={recalculate}
                      className="mt-2 text-green-app text-sm font-medium active:opacity-70">
                Recalculate target from profile →
              </button>
            </div>
          </Section>
        )}

        {/* Custom Targets */}
        <Section title="Daily Targets">
          {profile && (
            <div className="divide-y divide-gray-100">
              {[
                { label: 'Calories', value: profile.dailyCalorieTarget, unit: 'kcal' },
                { label: 'Protein', value: profile.dailyProteinTarget, unit: 'g' },
                { label: 'Carbs', value: profile.dailyCarbsTarget, unit: 'g' },
                { label: 'Fat', value: profile.dailyFatTarget, unit: 'g' },
                { label: 'Fiber', value: profile.dailyFiberTarget, unit: 'g' },
                { label: 'Water', value: profile.dailyWaterTarget, unit: 'ml' },
              ].map(({ label, value, unit }) => (
                <div key={label} className="flex items-center px-4 py-3">
                  <span className="text-gray-600 text-sm flex-1">{label}</span>
                  <span className="text-gray-800 font-semibold text-sm">{value} {unit}</span>
                </div>
              ))}
              <button onClick={() => setView('targets')}
                      className="w-full px-4 py-3 text-green-app text-sm font-semibold text-left active:bg-gray-50">
                Customize targets →
              </button>
            </div>
          )}
        </Section>

        {/* Stats */}
        <Section title="Statistics">
          <div className="divide-y divide-gray-100">
            <div className="flex items-center px-4 py-3">
              <span className="text-gray-600 text-sm flex-1">Total Food Entries</span>
              <span className="text-gray-800 font-semibold">{foodEntries.length}</span>
            </div>
            <div className="flex items-center px-4 py-3">
              <span className="text-gray-600 text-sm flex-1">Weight Logs</span>
              <span className="text-gray-800 font-semibold">{weightLogs.length}</span>
            </div>
            <div className="flex items-center px-4 py-3">
              <span className="text-gray-600 text-sm flex-1">Days Tracked</span>
              <span className="text-gray-800 font-semibold">
                {new Set(foodEntries.map(e => e.date)).size}
              </span>
            </div>
          </div>
        </Section>

        {/* Data */}
        <Section title="Data">
          <div className="divide-y divide-gray-100">
            <button onClick={handleExport}
                    className="w-full flex items-center px-4 py-4 text-left active:bg-gray-50">
              <span className="text-xl mr-3">📊</span>
              <div>
                <p className="text-gray-800 font-medium text-sm">Export as CSV</p>
                <p className="text-gray-400 text-xs">Download all food entries and weight logs</p>
              </div>
            </button>
          </div>
        </Section>

        {/* About */}
        <Section title="About">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-gray-600 text-sm">Version</span>
            <span className="text-gray-400 text-sm">1.0.0</span>
          </div>
        </Section>

        {/* Danger Zone */}
        <Section title="Danger Zone">
          <div className="px-4 py-4">
            <button onClick={() => setShowResetConfirm(true)}
                    className="w-full py-3 bg-red-50 text-red-600 font-semibold rounded-xl border border-red-200 active:bg-red-100">
              Reset All Data
            </button>
            <p className="text-gray-400 text-xs text-center mt-2">This permanently deletes everything</p>
          </div>
        </Section>
      </div>

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
             onClick={() => setShowResetConfirm(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6"
               onClick={e => e.stopPropagation()}
               style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Reset All Data?</h3>
            <p className="text-gray-500 text-sm mb-6">
              This will permanently delete all food entries, weight logs, and your profile. This cannot be undone.
            </p>
            <div className="space-y-3">
              <button onClick={handleReset}
                      className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl">
                Yes, Delete Everything
              </button>
              <button onClick={() => setShowResetConfirm(false)}
                      className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="px-1 pb-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
      <div className="card overflow-hidden">{children}</div>
    </div>
  );
}

function EditProfile({ onBack }) {
  const { profile, saveProfile } = useStore();
  const [form, setForm] = useState({ ...profile });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSave() {
    await saveProfile({ ...form });
    onBack();
  }

  return (
    <div className="fixed inset-0 z-40 bg-gray-50 flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="bg-white border-b border-gray-100 flex items-center px-4 py-3">
        <button onClick={onBack} className="text-gray-400 mr-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <h2 className="font-bold text-gray-900 flex-1">Edit Profile</h2>
        <button onClick={handleSave} className="text-green-app font-bold text-sm">Save</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="card p-4 space-y-4">
          <FormField label="Name">
            <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                   className="field" />
          </FormField>
          <FormField label="Age">
            <input type="number" inputMode="numeric" value={form.age}
                   onChange={e => update('age', parseInt(e.target.value))} className="field" />
          </FormField>
          <FormField label="Biological Sex">
            <div className="flex gap-2 mt-1">
              {['Male', 'Female'].map(s => (
                <button key={s} onClick={() => update('biologicalSex', s)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium border ${
                          form.biologicalSex === s
                            ? 'bg-green-app text-white border-green-app'
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}>{s}</button>
              ))}
            </div>
          </FormField>
        </div>

        <div className="card p-4 space-y-4">
          <SliderField label="Current Weight" value={form.currentWeight} unit="kg"
                       min={30} max={200} step={0.5} onChange={v => update('currentWeight', v)} />
          <SliderField label="Goal Weight" value={form.goalWeight} unit="kg"
                       min={30} max={200} step={0.5} onChange={v => update('goalWeight', v)} />
          <SliderField label="Height" value={form.height} unit="cm"
                       min={100} max={250} step={1} onChange={v => update('height', v)} />
        </div>

        <div className="card p-4 space-y-4">
          <FormField label="Activity Level">
            <select value={form.activityLevel} onChange={e => update('activityLevel', e.target.value)}
                    className="field">
              {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Goal">
            <select value={form.goalType} onChange={e => update('goalType', e.target.value)}
                    className="field">
              {['Lose Weight', 'Maintain Weight', 'Gain Weight'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Diet Preference">
            <select value={form.dietPreference} onChange={e => update('dietPreference', e.target.value)}
                    className="field">
              {['No Preference', 'Vegetarian', 'Vegan', 'Keto', 'High Protein'].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </FormField>
        </div>
      </div>
    </div>
  );
}

function CustomTargets({ onBack }) {
  const { profile, saveProfile } = useStore();
  const [form, setForm] = useState({
    dailyCalorieTarget: profile?.dailyCalorieTarget || 2000,
    dailyProteinTarget: profile?.dailyProteinTarget || 150,
    dailyCarbsTarget: profile?.dailyCarbsTarget || 250,
    dailyFatTarget: profile?.dailyFatTarget || 65,
    dailyFiberTarget: profile?.dailyFiberTarget || 30,
    dailyWaterTarget: profile?.dailyWaterTarget || 2500,
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSave() {
    await saveProfile({ ...profile, ...form });
    onBack();
  }

  const fields = [
    { key: 'dailyCalorieTarget', label: 'Calories', unit: 'kcal', min: 1000, max: 5000, step: 50 },
    { key: 'dailyProteinTarget', label: 'Protein', unit: 'g', min: 30, max: 400, step: 5 },
    { key: 'dailyCarbsTarget', label: 'Carbs', unit: 'g', min: 50, max: 600, step: 10 },
    { key: 'dailyFatTarget', label: 'Fat', unit: 'g', min: 20, max: 200, step: 5 },
    { key: 'dailyFiberTarget', label: 'Fiber', unit: 'g', min: 10, max: 100, step: 1 },
    { key: 'dailyWaterTarget', label: 'Water', unit: 'ml', min: 500, max: 6000, step: 250 },
  ];

  return (
    <div className="fixed inset-0 z-40 bg-gray-50 flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="bg-white border-b border-gray-100 flex items-center px-4 py-3">
        <button onClick={onBack} className="text-gray-400 mr-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <h2 className="font-bold text-gray-900 flex-1">Custom Targets</h2>
        <button onClick={handleSave} className="text-green-app font-bold text-sm">Save</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="card p-4 space-y-5">
          {fields.map(({ key, label, unit, min, max, step }) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <label className="text-gray-600 text-sm font-medium">{label}</label>
                <span className="text-gray-800 font-bold text-sm">{form[key]} {unit}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={form[key]}
                     onChange={e => update(key, parseInt(e.target.value))}
                     className="w-full accent-green-700 h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function SliderField({ label, value, unit, min, max, step, onChange }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <span className="text-gray-800 font-semibold text-sm">{typeof value === 'number' && !Number.isInteger(step) ? value.toFixed(1) : Math.round(value)} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
             onChange={e => onChange(parseFloat(e.target.value))}
             className="w-full accent-green-700 h-2" />
    </div>
  );
}
