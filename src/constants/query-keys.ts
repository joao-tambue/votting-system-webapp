export const authQueryKeys = {
  getMe: (voterId: string) => ["user-profile", voterId],
};

export const activitiesQueryKeys = {
  getActivities: () => ["activities-list"],
};

export const categoryQueryKeys = {
  getCategories: (activityId?: number) => ["categories", activityId],
  getSubcategories: (categoryId?: number) => ["subcategories", categoryId],
  getItemsFromCategories: (
    categoryType?: string,
    categoryId?: number,
    subCategoryId?: number
  ) => ["category-items", categoryType, categoryId, subCategoryId],
  getVotesLifetime: () => ["votes-lifetime"],
};