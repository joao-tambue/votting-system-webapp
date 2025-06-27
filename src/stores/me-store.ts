import { VoterModel } from "../models/voter.model";
import { createPersistentStore } from "./create-persistent-store";

type VoteStoreType = Partial<VoterModel> & {
  setMeData: (data: Partial<VoterModel>) => void;
  cleanMeData: () => void;
};

export const useMeStore = createPersistentStore<VoteStoreType>(
  "vts-me-sre",
  {
    id: undefined,
    name: undefined,
    email: undefined,
    setMeData: () => {},
    cleanMeData: () => {},
  },
  (set) => ({
    setMeData: (data) =>
      set({
        id: data.id,
        name: data.name,
        email: data.email,
      }),
    cleanMeData: () =>
      set({
        id: undefined,
        name: undefined,
        email: undefined,
      }),
  }),
  {
    storage: "localStorage",
    partialize: (state) => ({
      id: state.id,
      name: state.name,
      email: state.email,
    }),
  }
);
