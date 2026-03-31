import { AuthResponseModel } from "../models/auth.model";
import { createPersistentStore } from "./create-persistent-store";

type AuthStoreType = AuthResponseModel & {
  setAuthData: (data: AuthResponseModel) => void;
  cleanAuthData: () => void;
};

export const useAuthStore = createPersistentStore<AuthStoreType>(
  "vts-ath-sre",
  {
    token: undefined,
    refresh: undefined,
    email: undefined,
    setAuthData: () => {},
    cleanAuthData: () => {},
  },
  (set) => ({
    setAuthData: (data) =>
      set({
        token: data.token,
        refresh: data.refresh,
        email: data.email,
      }),
    cleanAuthData: () =>
      set({
        token: undefined,
        refresh: undefined,
        email: undefined,
      }),
  }),
  {
    storage: "localStorage",
    partialize: (state) => ({
      token: state.token,
      refresh: state.refresh,
      email: state.email,
    }),
  }
);
