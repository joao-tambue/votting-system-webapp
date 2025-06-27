import { CategoryTypeModel } from "../models/category.model";

export const authQueryKeys = {
  getMe: (voterId: string) => ["user-profile", voterId],
};

export const activitiesQueryKeys = {
  getActivities: () => ["activities-list"],
};

export const categoryQueryKeys = {
  getCategories: () => ["category-list"],
  getItemsFromCategories: (
    categoryType: CategoryTypeModel,
    categoryId?: number,
    subCategoryId?: number
  ) => ["category-items", categoryId, subCategoryId, categoryType],
};
