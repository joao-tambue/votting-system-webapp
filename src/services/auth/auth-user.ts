import { getMe } from "./get-me";
import { api } from "../../lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  AuthMergeResponseModel,
  AuthResponseModel,
} from "../../models/auth.model";

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

export function useSignInUser(
  config?: UseMutationOptions<AuthMergeResponseModel, Error, SignInRequestDTO>
) {
  return useMutation({
    mutationFn: async (data: SignInRequestDTO) => {
      const response = await signInUserApi({
        email: data.email,
        password: data.password,
      });

      const me = await getMe(response?.token);

      return {
        auth: response,
        me: me,
      };
    },
    ...config,
  });
}
