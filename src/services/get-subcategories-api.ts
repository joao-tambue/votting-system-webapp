import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Subcategory } from "../models/category.model";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";

export async function getSubcategoriesApi(
  activityId: number,
  categoryId: number
): Promise<Subcategory[]> {
  const response = await api.get<Subcategory[]>(
    `/api/get-subcategories/activity/${activityId}/category/${categoryId}`
  );

  console.log("Subcategories API Response:", response.data); // Log the response data for debugging
  return response.data;
}

type QueryFnType = typeof getSubcategoriesApi;

export function useSubcategories(activityId?: number, categoryId?: number) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getSubcategories(activityId, categoryId),
    queryFn: () => getSubcategoriesApi(activityId!, categoryId!),
    enabled: !!activityId && !!categoryId,
  });
}