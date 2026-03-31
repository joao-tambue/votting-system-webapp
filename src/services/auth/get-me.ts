import { api } from "../../lib/axios";
import { VoterModel } from "../../models/voter.model";

export async function getMe(token?: string): Promise<VoterModel> {
  if (token) {
    const response = await api.get<VoterModel>("/api/get-me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  const response = await api.get<VoterModel>("/api/get-me");
  return response.data;
}