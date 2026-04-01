import { ActivityModel } from "../models/activities.model";
import { createPersistentStore } from "./create-persistent-store";

type ActivityStoreType = Partial<ActivityModel> & {
  setActivityData: (data: ActivityModel) => void;
  cleanActivityData: () => void;
};

export const useActivityStore = createPersistentStore<ActivityStoreType>(
  "vts-act-sre",
  {
    id: undefined,
    name: undefined,
    description: undefined,
    finished: undefined,
    start_date: undefined,
    end_date: undefined,
    setActivityData: () => {},
    cleanActivityData: () => {},
  },
  (set) => ({
    setActivityData: (data) =>
      set({
        id: data.id,
        name: data.name,
        description: data.description,
        finished: data.finished,
        start_date: data.start_date,
        end_date: data.end_date,
      }),
    cleanActivityData: () =>
      set({
        id: undefined,
        name: undefined,
        description: undefined,
        finished: undefined,
        start_date: undefined,
        end_date: undefined,
      }),
  }),
  {
    storage: "localStorage",
    partialize: (state) => ({
      id: state.id,
      name: state.name,
      description: state.description,
      finished: state.finished,
    }),
  }
);