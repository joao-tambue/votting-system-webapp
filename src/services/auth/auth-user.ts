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

  // console.log("Login response:", response.data);

  return {
    token: response.data.token,
    refresh: response.data.refresh,
  } as AuthResponseModel;
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

      // console.log("Response completo:", response);
      // console.log("Token extraído:", response?.token);

      const me = await getMe(response?.token);

      return {
        auth: response,
        me: me,
      };
    },
    ...config,
  });
}
