import { api } from "../../lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type RegisterVoterRequestDTO = {
  name: string;
  email: string;
  password: string;
};

type RegisterVoterResponse = {
  message: string;
  // voter pode ou não vir (dependendo do backend).
};

export async function registerVoterApi(data: RegisterVoterRequestDTO) {
  const response = await api.post<RegisterVoterResponse>("/api/register-voter", data);
  return response.data;
}

export function useRegisterVoter(
  config?: UseMutationOptions<RegisterVoterResponse, Error, RegisterVoterRequestDTO>
) {
  return useMutation({
    mutationFn: registerVoterApi,
    ...config,
  });
}