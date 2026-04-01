import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Subcategory } from "../models/category.model";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";

export async function getSubcategoriesApi(categoryId: number): Promise<Subcategory[]> {
  const response = await api.get<Subcategory[]>(
    `/api/get-subcategories/${categoryId}`
  );

  console.log("Subcategories API Response:", response.data); // Log the raw response data for debugging
  return response.data;
}

type QueryFnType = typeof getSubcategoriesApi;

export function useSubcategories(categoryId?: number) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getSubcategories(categoryId),
    queryFn: () => getSubcategoriesApi(categoryId!),
    enabled: !!categoryId,
  });
}