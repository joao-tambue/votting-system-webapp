import { api } from "../../lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type VerifyEmailRequestDTO = {
  email: string;
  code: string;
};

type VerifyEmailResponse = {
  message: string;
};

export async function verifyEmailApi(data: VerifyEmailRequestDTO) {
  const response = await api.post<VerifyEmailResponse>("/api/verify-email", data);
  return response.data;
}

export function useVerifyEmail(
  config?: UseMutationOptions<VerifyEmailResponse, Error, VerifyEmailRequestDTO>
) {
  return useMutation({
    mutationFn: verifyEmailApi,
    ...config,
  });
}