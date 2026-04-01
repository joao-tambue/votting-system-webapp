import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ItemsModel } from "../models/items.model";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";
import { CategoryTypeModel } from "../models/category.model";

type ItemsResponse = {
  data: ItemsModel[];
};

export async function getProjectCategoriesItem(
  activityId: number,
  categoryId: number,
  subCategoryId: number,
  categoryType: CategoryTypeModel,
) {
  const response = await api.get<ItemsResponse>(
    `/api/get-category-items?cat_id=${categoryId}&subcat_id=${subCategoryId}&cat_tp=${categoryType}&act_id=${activityId}`
  );
  return response.data.data;
}

type QueryFnType = typeof getProjectCategoriesItem;

export function useItemsFromCategories(
  activityId?: number,
  categoryId?: number,
  subCategoryId?: number,
  categoryType?: CategoryTypeModel,
) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getItemsFromCategories(
      activityId,
      categoryType,
      categoryId,
      subCategoryId
    ),
    queryFn: () =>
      getProjectCategoriesItem(activityId!, categoryId!, subCategoryId!, categoryType!),
    enabled: !!activityId && !!categoryId && !!categoryType,
  });
}