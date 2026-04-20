export const authQueryKeys = {
  getMe: (voterId: string) => ["user-profile", voterId],
};

export const activitiesQueryKeys = {
  getActivities: () => ["activities-list"],
};

export const categoryQueryKeys = {
  getCategories: (activityId?: number) => ["categories", activityId],
  getSubcategories: (activityId?: number, categoryId?: number, page: number = 1) => [
    "subcategories",
    activityId,
    categoryId,
    page,
  ],
  getItemsFromCategories: (
    activityId?: number,
    categoryType?: string,
    categoryId?: number,
    subCategoryId?: number,
    page: number = 1
  ) => ["category-items", activityId, categoryType, categoryId, subCategoryId, page],
  getSubcategoryProjects: (subcategoryId: number) =>
    ["subcategoryProjects", subcategoryId] as const,
  getPublicRankings: (activityId?: number) => ["public-rankings", activityId],
  getVotesLifetime: () => ["votes-lifetime"],
};