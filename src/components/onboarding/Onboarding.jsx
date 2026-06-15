import { useState } from 'react';
import useStore from '../../store/useStore.js';
import { calculateCalorieTarget, calculateMacroTargets } from '../../utils/calculations.js';

const ACTIVITY_LEVELS = [
  { value: 'Sedentary', desc: 'Little or no exercise, desk job' },
  { value: 'Lightly Active', desc: 'Light exercise 1–3 days/week' },
  { value: 'Moderately Active', desc: 'Moderate exercise 3–5 days/week' },
  { value: 'Very Active', desc: 'Hard exercise 6–7 days/week' },
];

const GOAL_TYPES = ['Lose Weight', 'Maintain Weight', 'Gain Weight'];
const RATE_OPTIONS = [
  { value: 0.25, label: '0.25 kg/week (mild)' },
  { value: 0.5, label: '0.5 kg/week (moderate)' },
  { value: 0.75, label: '0.75 kg/week (aggressive)' },
  { value: 1.0, label: '1.0 kg/week (very aggressive)' },
];
const DIET_PREFS = ['No Preference', 'Vegetarian', 'Vegan', 'Keto', 'High Protein'];

export default function Onboarding() {
  const { saveProfile } = useStore();
  const [step, setStep] = useState(0);
  const TOTAL = 5;

  const [form, setForm] = useState({
    name: '',
    age: 25,
    biologicalSex: 'Male',
    currentWeight: 70,
    goalWeight: 65,
    height: 170,
    activityLevel: 'Moderately Active',
    goalType: 'Lose Weight',
    rateOfChange: 0.5,
    dietPreference: 'No Preference',
  });

  const update = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const preview = (() => {
    const cals = calculateCalorieTarget(form);
    const macros = calculateMacroTargets(cals, form.dietPreference);
    return { cals, macros };
  })();

  async function finish() {
    const cals = calculateCalorieTarget(form);
    const macros = calculateMacroTargets(cals, form.dietPreference);
    const profile = {
      ...form,
      dailyCalorieTarget: cals,
      dailyProteinTarget: macros.protein,
      dailyCarbsTarget: macros.carbs,
      dailyFatTarget: macros.fat,
      dailyFiberTarget: 30,
      dailyWaterTarget: 2500,
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
    };
    await saveProfile(profile);
  }

  const steps = [
    <StepBasicInfo key={0} form={form} update={update} />,
    <StepBodyMetrics key={1} form={form} update={update} />,
    <StepGoals key={2} form={form} update={update} />,
    <StepActivity key={3} form={form} update={update} />,
    <StepDiet key={4} form={form} update={update} preview={preview} />,
  ];

  const canNext = step === 0 ? form.name.trim().length > 0 : true;

  return (
    <div className="min-h-screen flex flex-col"
         style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)' }}>
      {/* Safe area top */}
      <div style={{ paddingTop: 'env(safe-area-inset-top)' }} />

      {/* Progress */}
      <div className="px-6 pt-4">
        <div className="flex gap-1.5 mb-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
        <p className="text-white/70 text-sm">Step {step + 1} of {TOTAL}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {steps[step]}
      </div>

      {/* Navigation */}
      <div className="px-6 pb-6 flex gap-3" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
                  className="flex-1 py-3 rounded-2xl border-2 border-white/50 text-white font-semibold text-base">
            Back
          </button>
        )}
        {step < TOTAL - 1 ? (
          <button
            onClick={() => canNext && setStep(s => s + 1)}
            disabled={!canNext}
            className={`flex-1 py-3 rounded-2xl font-semibold text-base transition-all ${
              canNext ? 'bg-white text-green-app shadow-lg' : 'bg-white/30 text-white/50'
            }`}>
            Next
          </button>
        ) : (
          <button
            onClick={finish}
            className="flex-1 py-3 rounded-2xl bg-white text-green-app font-bold text-base shadow-lg">
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white/15 rounded-2xl p-5 backdrop-blur-sm">
      {children}
    </div>
  );
}

function FieldLabel({ children }) {
  return <p className="text-white/70 text-xs uppercase tracking-wider mb-2 font-medium">{children}</p>;
}

function StepBasicInfo({ form, update }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-3xl font-bold mb-2">Welcome!</h1>
        <p className="text-white/80 text-sm">Let's set up your profile to calculate your personalized calorie targets.</p>
      </div>
      <Card>
        <div className="space-y-5">
          <div>
            <FieldLabel>Your Name</FieldLabel>
            <input
              type="text"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-white/20 text-white placeholder-white/50 rounded-xl px-4 py-3 text-base outline-none border border-white/30 focus:border-white/70"
            />
          </div>
          <div>
            <FieldLabel>Age</FieldLabel>
            <div className="flex items-center gap-4">
              <button onClick={() => update('age', Math.max(13, form.age - 1))}
                      className="w-10 h-10 rounded-full bg-white/20 text-white font-bold text-lg flex items-center justify-center">−</button>
              <span className="text-white text-xl font-semibold flex-1 text-center">{form.age} years</span>
              <button onClick={() => update('age', Math.min(100, form.age + 1))}
                      className="w-10 h-10 rounded-full bg-white/20 text-white font-bold text-lg flex items-center justify-center">+</button>
            </div>
          </div>
          <div>
            <FieldLabel>Biological Sex</FieldLabel>
            <div className="flex gap-3">
              {['Male', 'Female'].map(s => (
                <button key={s} onClick={() => update('biologicalSex', s)}
                        className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                          form.biologicalSex === s ? 'bg-white text-green-app font-semibold' : 'bg-white/20 text-white'
                        }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function StepBodyMetrics({ form, update }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-3xl font-bold mb-2">Body Metrics</h1>
        <p className="text-white/80 text-sm">Your measurements help calculate your calorie needs.</p>
      </div>
      <Card>
        <div className="space-y-6">
          <SliderField label="Current Weight" value={form.currentWeight} unit="kg"
                       min={30} max={200} step={0.5} onChange={v => update('currentWeight', v)} />
          <SliderField label="Goal Weight" value={form.goalWeight} unit="kg"
                       min={30} max={200} step={0.5} onChange={v => update('goalWeight', v)} />
          <SliderField label="Height" value={form.height} unit="cm"
                       min={100} max={250} step={1} onChange={v => update('height', v)} />
        </div>
      </Card>
    </div>
  );
}

function SliderField({ label, value, unit, min, max, step, onChange }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center gap-3">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="flex-1 accent-white h-2"
        />
        <span className="text-white font-semibold text-sm w-20 text-right">
          {Number.isInteger(step) ? Math.round(value) : value.toFixed(1)} {unit}
        </span>
      </div>
    </div>
  );
}

function StepGoals({ form, update }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-3xl font-bold mb-2">Your Goal</h1>
        <p className="text-white/80 text-sm">What are you working towards?</p>
      </div>
      <div className="space-y-3">
        {GOAL_TYPES.map(g => (
          <button key={g} onClick={() => update('goalType', g)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-left transition-all ${
                    form.goalType === g ? 'bg-white/25 border border-white' : 'bg-white/10 border border-transparent'
                  }`}>
            <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
              form.goalType === g ? 'bg-white' : ''
            }`}>
              {form.goalType === g && <div className="w-2.5 h-2.5 rounded-full bg-green-app" />}
            </div>
            <span className="text-white font-semibold">{g}</span>
          </button>
        ))}
      </div>

      {form.goalType !== 'Maintain Weight' && (
        <Card>
          <FieldLabel>Rate of Change</FieldLabel>
          <div className="space-y-2">
            {RATE_OPTIONS.map(r => (
              <button key={r.value} onClick={() => update('rateOfChange', r.value)}
                      className={`w-full flex items-center gap-3 py-2.5 text-left ${
                        form.rateOfChange === r.value ? 'text-white' : 'text-white/70'
                      }`}>
                <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                  form.rateOfChange === r.value ? 'bg-white' : ''
                }`}>
                  {form.rateOfChange === r.value && <div className="w-2 h-2 rounded-full bg-green-app" />}
                </div>
                <span className="text-sm">{r.label}</span>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function StepActivity({ form, update }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-3xl font-bold mb-2">Activity Level</h1>
        <p className="text-white/80 text-sm">How active are you in your daily life?</p>
      </div>
      <div className="space-y-3">
        {ACTIVITY_LEVELS.map(({ value, desc }) => (
          <button key={value} onClick={() => update('activityLevel', value)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-left transition-all ${
                    form.activityLevel === value ? 'bg-white/25 border border-white' : 'bg-white/10 border border-transparent'
                  }`}>
            <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 ${
              form.activityLevel === value ? 'bg-white' : ''
            }`}>
              {form.activityLevel === value && <div className="w-2.5 h-2.5 rounded-full bg-green-app" />}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{value}</div>
              <div className="text-white/70 text-xs mt-0.5">{desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDiet({ form, update, preview }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-3xl font-bold mb-2">Diet Preference</h1>
        <p className="text-white/80 text-sm">This helps customize your macro targets.</p>
      </div>
      <div className="space-y-2">
        {DIET_PREFS.map(p => (
          <button key={p} onClick={() => update('dietPreference', p)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all ${
                    form.dietPreference === p ? 'bg-white/25 border border-white' : 'bg-white/10 border border-transparent'
                  }`}>
            <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
              form.dietPreference === p ? 'bg-white' : ''
            }`}>
              {form.dietPreference === p && <div className="w-2.5 h-2.5 rounded-full bg-green-app" />}
            </div>
            <span className="text-white font-medium">{p}</span>
          </button>
        ))}
      </div>

      <Card>
        <p className="text-white/70 text-xs uppercase tracking-wider mb-3 font-medium">Estimated Daily Target</p>
        <p className="text-white text-5xl font-bold text-center mb-4">{preview.cals}</p>
        <p className="text-white/70 text-center text-sm mb-4">kcal / day</p>
        <div className="flex justify-around">
          <MacroPreview label="Protein" grams={preview.macros.protein} color="text-blue-300" />
          <MacroPreview label="Carbs" grams={preview.macros.carbs} color="text-orange-300" />
          <MacroPreview label="Fat" grams={preview.macros.fat} color="text-yellow-300" />
        </div>
      </Card>
    </div>
  );
}

function MacroPreview({ label, grams, color }) {
  return (
    <div className="text-center">
      <p className={`text-xl font-bold ${color}`}>{grams}g</p>
      <p className="text-white/70 text-xs mt-0.5">{label}</p>
    </div>
  );
}
