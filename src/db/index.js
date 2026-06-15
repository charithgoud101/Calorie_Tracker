import { openDB } from 'idb';

const DB_NAME = 'calorieTrackerDB';
const DB_VERSION = 1;

let dbPromise;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('foodEntries')) {
          const store = db.createObjectStore('foodEntries', { keyPath: 'id' });
          store.createIndex('by-date', 'date');
          store.createIndex('by-meal', 'mealType');
        }
        if (!db.objectStoreNames.contains('dailyLogs')) {
          db.createObjectStore('dailyLogs', { keyPath: 'date' });
        }
        if (!db.objectStoreNames.contains('weightLogs')) {
          const wStore = db.createObjectStore('weightLogs', { keyPath: 'id' });
          wStore.createIndex('by-date', 'date');
        }
        if (!db.objectStoreNames.contains('userProfile')) {
          db.createObjectStore('userProfile', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('recipes')) {
          db.createObjectStore('recipes', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('customFoods')) {
          db.createObjectStore('customFoods', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

// ---- User Profile ----
export async function saveProfile(profile) {
  const db = await getDB();
  await db.put('userProfile', { ...profile, id: 'default' });
}

export async function loadProfile() {
  const db = await getDB();
  return db.get('userProfile', 'default');
}

// ---- Food Entries ----
export async function addFoodEntry(entry) {
  const db = await getDB();
  await db.put('foodEntries', entry);
}

export async function deleteFoodEntry(id) {
  const db = await getDB();
  await db.delete('foodEntries', id);
}

export async function getAllFoodEntries() {
  const db = await getDB();
  return db.getAll('foodEntries');
}

export async function getFoodEntriesForDate(dateStr) {
  const db = await getDB();
  const all = await db.getAll('foodEntries');
  return all.filter(e => e.date === dateStr);
}

// ---- Daily Logs ----
export async function getDailyLog(dateStr) {
  const db = await getDB();
  return db.get('dailyLogs', dateStr) || { date: dateStr, waterMl: 0 };
}

export async function saveDailyLog(log) {
  const db = await getDB();
  await db.put('dailyLogs', log);
}

export async function getAllDailyLogs() {
  const db = await getDB();
  return db.getAll('dailyLogs');
}

// ---- Weight Logs ----
export async function addWeightLog(log) {
  const db = await getDB();
  await db.put('weightLogs', log);
}

export async function getAllWeightLogs() {
  const db = await getDB();
  const logs = await db.getAll('weightLogs');
  return logs.sort((a, b) => a.date.localeCompare(b.date));
}

// ---- Recipes ----
export async function saveRecipe(recipe) {
  const db = await getDB();
  await db.put('recipes', recipe);
}

export async function deleteRecipe(id) {
  const db = await getDB();
  await db.delete('recipes', id);
}

export async function getAllRecipes() {
  const db = await getDB();
  return db.getAll('recipes');
}

// ---- Custom Foods ----
export async function saveCustomFood(food) {
  const db = await getDB();
  await db.put('customFoods', food);
}

export async function getAllCustomFoods() {
  const db = await getDB();
  return db.getAll('customFoods');
}

// ---- Clear All ----
export async function clearAllData() {
  const db = await getDB();
  const tx = db.transaction(['foodEntries', 'dailyLogs', 'weightLogs', 'userProfile', 'recipes', 'customFoods'], 'readwrite');
  await Promise.all([
    tx.objectStore('foodEntries').clear(),
    tx.objectStore('dailyLogs').clear(),
    tx.objectStore('weightLogs').clear(),
    tx.objectStore('userProfile').clear(),
    tx.objectStore('recipes').clear(),
    tx.objectStore('customFoods').clear(),
    tx.done,
  ]);
}
