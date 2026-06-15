import { useEffect } from 'react';
import useStore from './store/useStore.js';
import Onboarding from './components/onboarding/Onboarding.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import LogFood from './components/logfood/LogFood.jsx';
import Progress from './components/progress/Progress.jsx';
import Recipes from './components/recipes/Recipes.jsx';
import Settings from './components/settings/Settings.jsx';
import BottomNav from './components/layout/BottomNav.jsx';
import { todayStr } from './utils/calculations.js';

export default function App() {
  const {
    profile, profileLoaded,
    activeTab,
    loadProfile, loadAllEntries, loadDailyLog, loadWeightLogs, loadRecipes, loadCustomFoods,
  } = useStore();

  useEffect(() => {
    (async () => {
      await loadProfile();
      await Promise.all([
        loadAllEntries(),
        loadDailyLog(todayStr()),
        loadWeightLogs(),
        loadRecipes(),
        loadCustomFoods(),
      ]);
    })();
  }, []);

  if (!profileLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-app">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile || !profile.onboardingCompleted) {
    return <Onboarding />;
  }

  const tabs = {
    dashboard: <Dashboard />,
    log: <LogFood />,
    progress: <Progress />,
    recipes: <Recipes />,
    settings: <Settings />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 overflow-hidden">
        {tabs[activeTab] || <Dashboard />}
      </main>
      <BottomNav />
    </div>
  );
}
