import { AuthResponseModel } from "../models/auth.model";
import { createPersistentStore } from "./create-persistent-store";

type AuthStoreType = AuthResponseModel & {
  setAuthData: (data: AuthResponseModel) => void;
  cleanAuthData: () => void;
};

export const useAuthStore = createPersistentStore<AuthStoreType>(
  "vts-ath-sre",
  {
    access: undefined,
    refresh: undefined,
    email: undefined,
    setAuthData: () => {},
    cleanAuthData: () => {},
  },
  (set) => ({
    setAuthData: (data) =>
      set({
        access: data.access,
        refresh: data.refresh,
        email: data.email,
      }),
    cleanAuthData: () =>
      set({
        access: undefined,
        refresh: undefined,
        email: undefined,
      }),
  }),
  {
    storage: "localStorage",
    partialize: (state) => ({
      access: state.access,
      refresh: state.refresh,
      email: state.email,
    }),
  }
);
