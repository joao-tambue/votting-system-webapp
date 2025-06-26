import { api } from "../../lib/axios";
import { VoterModel } from "../../models/voter.model";

export async function getMe(token: string) {
  const response = await api.get<VoterModel>("/api/get-me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
