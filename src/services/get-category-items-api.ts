import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ItemsModel } from "../models/items.model";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";
import { CategoryTypeModel } from "../models/category.model";

type PaginatedItemsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ItemsModel[];
};

export async function getProjectCategoriesItem(
  activityId: number,
  categoryId: number,
  subCategoryId: number,
  categoryType: CategoryTypeModel,
  page: number = 1
): Promise<PaginatedItemsResponse> {
  const response = await api.get<PaginatedItemsResponse>(
    "/api/get-category-items",
    {
      params: {
        cat_id: categoryId,
        subcat_id: subCategoryId,
        cat_tp: categoryType,
        act_id: activityId,
        page,
      },
    }
  );

  console.log("Response de getProjectCategoriesItem:", response.data);
  return response.data;
}

type QueryFnType = typeof getProjectCategoriesItem;

export function useItemsFromCategories(
  activityId?: number,
  categoryId?: number,
  subCategoryId?: number,
  categoryType?: CategoryTypeModel,
  page: number = 1
) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getItemsFromCategories(
      activityId,
      categoryType,
      categoryId,
      subCategoryId,
      page
    ),
    queryFn: () =>
      getProjectCategoriesItem(activityId!, categoryId!, subCategoryId!, categoryType!, page),
    enabled: !!activityId && !!categoryId && !!categoryType,
  });
}