import { CategoryModel } from "../models/category.model";
import { createPersistentStore } from "./create-persistent-store";

type CategoryStoreType = Partial<CategoryModel> & {
  setCategoryData: (data: CategoryModel) => void;
  cleanCategoryData: () => void;
};

export const useCategoriesStore = createPersistentStore<CategoryStoreType>(
  "vts-ctg-sre",
  {
    id: undefined,
    name: undefined,
    category_type: undefined,
    subcategories: undefined,
    setCategoryData: () => {},
    cleanCategoryData: () => {},
  },
  (set) => ({
    setCategoryData: (data) =>
      set({
        id: data.id,
        name: data.name,
        category_type: data.category_type,
        subcategories: data.subcategories,
      }),
    cleanCategoryData: () =>
      set({
        id: undefined,
        name: undefined,
        category_type: undefined,
        subcategories: undefined,
      }),
  }),
  {
    storage: "localStorage",
    partialize: (state) => ({
      id: state.id,
      name: state.name,
      category_type: state.category_type,
      subcategories: state.subcategories,
    }),
  }
);
