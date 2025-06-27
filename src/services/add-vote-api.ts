import { api } from "../lib/axios";
import { MutationConfig } from "../lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { CategoryTypeModel } from "../models/category.model";

type AddVoteRequestDTO = {
  activity_id?: number;
  item_id?: number;
  category_id?: number;
  subcategory_id?: number;
  category_type?: CategoryTypeModel;
};

export async function addVoteApi(data: AddVoteRequestDTO) {
  const response = await api.post("/api/vote", data);
  return response.data;
}

export function useAddUserVote(config?: MutationConfig<typeof addVoteApi>) {
  return useMutation({
    mutationFn: addVoteApi,
    ...config,
  });
}
