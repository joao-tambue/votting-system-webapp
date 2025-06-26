import { decrypt, encrypt } from "../utils/crypto";
import { create, StateCreator, StoreApi } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

type StorageType = "localStorage" | "sessionStorage";
type PartializeFunction<T> = (state: T) => Partial<T>;

interface PersistentStoreOptions<T> {
  storage?: StorageType;
  partialize?: PartializeFunction<T>;
  onRehydrateStorage?: (state: T | undefined, store: StoreApi<T>) => void;
}

export function createPersistentStore<T extends object>(
  storeName: string,
  initialState: T,
  stateCreator: StateCreator<T, [["zustand/persist", unknown]]>,
  options: PersistentStoreOptions<T> = {}
) {
  const persistConfig: PersistOptions<T> = {
    name: storeName,
    storage: createJSONStorage(() => ({
      getItem: (key: string): string | null => {
        if (typeof window === "undefined") return null;
        const storage =
          options.storage === "sessionStorage" ? sessionStorage : localStorage;
        const value = storage.getItem(key);
        if (!value) return null;
        try {
          return decrypt(value);
        } catch (error) {
          console.error("Decryption failed, returning original value:", error);
          return value;
        }
      },
      setItem: (key: string, value: string): void => {
        if (typeof window === "undefined") return;
        const storage =
          options.storage === "sessionStorage" ? sessionStorage : localStorage;
        try {
          const encrypted = encrypt(value);
          storage.setItem(key, encrypted);
        } catch (error) {
          console.error("Encryption failed, storing original value:", error);
          storage.setItem(key, value);
        }
      },
      removeItem: (key: string): void => {
        if (typeof window === "undefined") return;
        const storage =
          options.storage === "sessionStorage" ? sessionStorage : localStorage;
        storage.removeItem(key);
      },
    })),
    version: 1,
  };

  if (options.partialize) {
    persistConfig.partialize = options.partialize as (state: T) => T;
  }

  // return create<T>()(persist(stateCreator, persistConfig));

  const store = create<T>()(persist(stateCreator, persistConfig));

  // If onRehydrateStorage is provided, call it with the store instance
  if (options.onRehydrateStorage) {
    persistConfig.onRehydrateStorage = (state) => {
      options.onRehydrateStorage!(state, store);
    };
  }

  return store;
}

export function clearAllPersistedData() {
  if (typeof window !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
  }
}
