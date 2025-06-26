import { api } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "../../lib/react-query";
import { AuthResponseModel } from "../../models/auth.model";

type SignInRequestDTO = {
  email: string;
  password: string;
};

export async function signInUserApi({ email, password }: SignInRequestDTO) {
  const response = await api.post<AuthResponseModel>("/api/login", {
    email,
    password,
  });
  return response.data;
}

export function useSignInUser(config?: MutationConfig<typeof signInUserApi>) {
  return useMutation({
    mutationFn: signInUserApi,
    ...config,
  });
}
