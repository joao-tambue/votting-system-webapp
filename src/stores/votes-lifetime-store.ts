import { createPersistentStore } from "./create-persistent-store";

type AuthStoreType = {
  isFetched?: boolean;
  setLifetimeStatus: (lifetimeStatus: boolean) => void;
  cleanLifetimeStatus: () => void;
};

export const useVotesLifetimeStore = createPersistentStore<AuthStoreType>(
  "vts-lftm-sre",
  {
    isFetched: undefined,
    setLifetimeStatus: () => {},
    cleanLifetimeStatus: () => {},
  },
  (set) => ({
    setLifetimeStatus: (lifetimeStatus) =>
      set({
        isFetched: lifetimeStatus,
      }),
    cleanLifetimeStatus: () =>
      set({
        isFetched: undefined,
      }),
  }),
  {
    storage: "localStorage",
    partialize: (state) => ({
      isFetched: state.isFetched,
    }),
  }
);
