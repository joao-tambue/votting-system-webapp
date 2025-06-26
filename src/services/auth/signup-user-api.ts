import { api } from "../../lib/axios";
import { signInUserApi } from "./auth-user";
import { VoterModel } from "../../models/voter.model";
import { AuthMergeResponseModel } from "../../models/auth.model";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type SignUpRequestDTO = {
  name: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  message: string;
  voter: VoterModel;
};

export async function signUpUserApi(data: SignUpRequestDTO) {
  const response = await api.post<SignUpResponse>("/api/register-voter", data);
  return response.data;
}

export function useSignUpUser(
  config?: UseMutationOptions<AuthMergeResponseModel, Error, SignUpRequestDTO>
) {
  return useMutation({
    mutationFn: async (data: SignUpRequestDTO) => {
      const response = await signUpUserApi(data);

      const authCredentials = await signInUserApi({
        email: response.voter.email,
        password: data.password,
      });

      return {
        auth: authCredentials,
        me: response.voter,
      };
    },
    ...config,
  });
}
