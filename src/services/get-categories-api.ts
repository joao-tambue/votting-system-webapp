import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";
import { CategoryModel } from "../models/category.model";

export async function getCategoriesApi(activityId: number): Promise<CategoryModel[]> {
  const response = await api.get<CategoryModel[]>(
    `/api/get-categories/${activityId}`
  );

  console.log("Categories API Response:", response.data);
  return response.data;
}

type QueryFnType = typeof getCategoriesApi;

export function useCategories(activityId?: number) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getCategories(activityId),
    queryFn: () => getCategoriesApi(activityId!),
    enabled: !!activityId,
  });
}