import { create } from 'zustand';
import {
  loadProfile, saveProfile,
  getAllFoodEntries, addFoodEntry as dbAddFood, deleteFoodEntry as dbDeleteFood,
  getDailyLog, saveDailyLog,
  getAllWeightLogs, addWeightLog as dbAddWeight,
  getAllRecipes, saveRecipe as dbSaveRecipe, deleteRecipe as dbDeleteRecipe,
  getAllCustomFoods, saveCustomFood as dbSaveCustomFood,
  clearAllData,
} from '../db/index.js';
import { todayStr, generateId } from '../utils/calculations.js';

const useStore = create((set, get) => ({
  // ---- Dark Mode ----
  darkMode: localStorage.getItem('darkMode') === 'true',

  toggleDarkMode: () => {
    const next = !get().darkMode;
    localStorage.setItem('darkMode', String(next));
    set({ darkMode: next });
  },

  // ---- Profile ----
  profile: null,
  profileLoaded: false,

  loadProfile: async () => {
    const profile = await loadProfile();
    set({ profile: profile || null, profileLoaded: true });
  },

  saveProfile: async (profileData) => {
    await saveProfile(profileData);
    set({ profile: profileData });
  },

  // ---- Food Entries ----
  foodEntries: [],
  entriesLoaded: false,

  loadAllEntries: async () => {
    const entries = await getAllFoodEntries();
    set({ foodEntries: entries, entriesLoaded: true });
  },

  addFoodEntry: async (entryData) => {
    const entry = { id: generateId(), ...entryData, date: entryData.date || todayStr() };
    await dbAddFood(entry);
    set(state => ({ foodEntries: [...state.foodEntries, entry] }));
    return entry;
  },

  deleteFoodEntry: async (id) => {
    await dbDeleteFood(id);
    set(state => ({ foodEntries: state.foodEntries.filter(e => e.id !== id) }));
  },

  // ---- Daily Log ----
  dailyLog: { date: todayStr(), waterMl: 0 },

  loadDailyLog: async (date) => {
    const log = await getDailyLog(date || todayStr());
    set({ dailyLog: log || { date: date || todayStr(), waterMl: 0 } });
  },

  addWater: async (amount) => {
    const { dailyLog } = get();
    const updated = { ...dailyLog, waterMl: (dailyLog.waterMl || 0) + amount };
    await saveDailyLog(updated);
    set({ dailyLog: updated });
  },

  setWater: async (amount) => {
    const { dailyLog } = get();
    const updated = { ...dailyLog, waterMl: amount };
    await saveDailyLog(updated);
    set({ dailyLog: updated });
  },

  // ---- Steps ----
  setSteps: async (steps) => {
    const { dailyLog } = get();
    const updated = { ...dailyLog, steps: Math.max(0, steps) };
    await saveDailyLog(updated);
    set({ dailyLog: updated });
  },

  addSteps: async (amount) => {
    const { dailyLog } = get();
    const updated = { ...dailyLog, steps: (dailyLog.steps || 0) + amount };
    await saveDailyLog(updated);
    set({ dailyLog: updated });
  },

  // ---- Weight Logs ----
  weightLogs: [],

  loadWeightLogs: async () => {
    const logs = await getAllWeightLogs();
    set({ weightLogs: logs });
  },

  addWeightLog: async (weightKg) => {
    const log = { id: generateId(), date: todayStr(), weightKg };
    await dbAddWeight(log);
    set(state => ({ weightLogs: [...state.weightLogs, log].sort((a, b) => a.date.localeCompare(b.date)) }));
  },

  // ---- Recipes ----
  recipes: [],

  loadRecipes: async () => {
    const recipes = await getAllRecipes();
    set({ recipes });
  },

  saveRecipe: async (recipe) => {
    const r = recipe.id ? recipe : { ...recipe, id: generateId(), createdAt: todayStr() };
    await dbSaveRecipe(r);
    set(state => {
      const existing = state.recipes.findIndex(x => x.id === r.id);
      if (existing >= 0) {
        const updated = [...state.recipes];
        updated[existing] = r;
        return { recipes: updated };
      }
      return { recipes: [...state.recipes, r] };
    });
    return r;
  },

  deleteRecipe: async (id) => {
    await dbDeleteRecipe(id);
    set(state => ({ recipes: state.recipes.filter(r => r.id !== id) }));
  },

  // ---- Custom Foods ----
  customFoods: [],

  loadCustomFoods: async () => {
    const foods = await getAllCustomFoods();
    set({ customFoods: foods });
  },

  saveCustomFood: async (food) => {
    const f = { ...food, id: food.id || generateId() };
    await dbSaveCustomFood(f);
    set(state => ({ customFoods: [...state.customFoods.filter(x => x.id !== f.id), f] }));
  },

  // ---- Reset ----
  clearAllData: async () => {
    await clearAllData();
    set({
      profile: null,
      foodEntries: [],
      dailyLog: { date: todayStr(), waterMl: 0 },
      weightLogs: [],
      recipes: [],
      customFoods: [],
    });
  },

  // ---- Active Tab ----
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useStore;
