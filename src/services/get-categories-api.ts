import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";
import { CategoryModel } from "../models/category.model";

export async function getCategoriesApi() {
  const response = await api.get<CategoryModel[]>("/api/get-categories");
  return response.data;
}

type QueryFnType = typeof getCategoriesApi;

export function useCategories() {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getCategories(),
    queryFn: () => getCategoriesApi(),
  });
}
