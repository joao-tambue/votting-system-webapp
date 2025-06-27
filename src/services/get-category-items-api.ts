import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ItemsModel } from "../models/items.model";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";
import { DEFAULT_ACTIVITY_ID } from "../constants/constants";
import { CategoryTypeModel } from "../models/category.model";

type ItemsResponse = {
  data: ItemsModel[];
};

export async function getProjectCategoriesItem(
  categoryType: CategoryTypeModel,
  categoryId?: number,
  subCategoryId?: number
) {
  const catId = categoryId || 0;
  const subCatId = subCategoryId || 0;

  const response = await api.get<ItemsResponse>(
    `/api/get-category-items?cat_id=${catId}&subcat_id=${subCatId}&cat_tp=${categoryType}&act_id=${DEFAULT_ACTIVITY_ID}`
  );
  return response.data.data;
}

type QueryFnType = typeof getProjectCategoriesItem;

export function useItemsFromCategories(
  categoryType: CategoryTypeModel,
  categoryId?: number,
  subCategoryId?: number
) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getItemsFromCategories(
      categoryType,
      categoryId,
      subCategoryId
    ),
    queryFn: () =>
      getProjectCategoriesItem(categoryType, categoryId, subCategoryId),
  });
}
