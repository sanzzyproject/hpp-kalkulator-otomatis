import { openDB, DBSchema } from 'idb';
import { Calculation } from '@/types';

interface MyDB extends DBSchema {
  calculations: {
    key: number;
    value: Calculation;
    indexes: { 'by-date': number };
  };
}

const dbName = 'hpp_calculator_db';
const storeName = 'calculations';

export async function getDB() {
  return openDB<MyDB>(dbName, 1, {
    upgrade(db) {
      const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      store.createIndex('by-date', 'createdAt');
    },
  });
}

export async function saveCalculation(calculation: Omit<Calculation, 'id' | 'createdAt'>) {
  const db = await getDB();
  const id = await db.add(storeName, { ...calculation, createdAt: Date.now() });
  return id;
}

export async function getAllCalculations() {
  const db = await getDB();
  return db.getAllFromIndex(storeName, 'by-date');
}

export async function getCalculation(id: number) {
  const db = await getDB();
  return db.get(storeName, id);
}

export async function deleteCalculation(id: number) {
  const db = await getDB();
  return db.delete(storeName, id);
}
