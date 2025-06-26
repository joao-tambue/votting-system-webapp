import React, { useState } from "react";

import { z } from "zod";

import nookies from "nookies";

import { toast } from "react-toastify";
import When from "../components/When";
import { useForm } from "react-hook-form";
import { useMeStore } from "../stores/me-store";
import { Spinner } from "../components/Spinner";
import { useAuthStore } from "../stores/auth-store";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInUser } from "../services/auth/auth-user";
import { AuthMergeResponseModel } from "../models/auth.model";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { handleApiError } from "../services/errors/handle-errors-api";
import { oneHourInSeconds, VTS_AUTH_TOKEN } from "../constants/cookies-keys";

const signInUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SignInUserForm = z.infer<typeof signInUserSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { setMeData } = useMeStore();
  const { setAuthData } = useAuthStore();

  const {
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SignInUserForm>({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInUserMutateAsync, isPending } = useSignInUser({
    onError: (error) => handleApiError(error, "Usuário"),
    onSuccess: (data: AuthMergeResponseModel) => {
      toast.success("Bem vindo haha!...");
      reset();

      setMeData(data.me);
      setAuthData(data.auth);

      if (data.auth.access) {
        const expDate = new Date();
        expDate.setTime(expDate.getTime() + oneHourInSeconds * 1000);

        nookies.set(null, VTS_AUTH_TOKEN, data.auth.access, {
          path: "/",
          expires: expDate,
        });
      }

      navigate("/");
    },
  });

  const handleSignIn = async (data: SignInUserForm) => {
    await signInUserMutateAsync({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logo-caf.png"
            alt="CAF Logo"
            className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            CAF Voting System
          </h1>
          <p className="text-gray-600 text-sm">
            Sistema de Votação do Colégio Árvore da Felicidade
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                id="email"
                value={watch("email")}
                onChange={(e) =>
                  setValue("email", e.target.value, {
                    shouldValidate: true,
                  })
                }
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="seu.email@exemplo.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={watch("password")}
                onChange={(e) =>
                  setValue("password", e.target.value, {
                    shouldValidate: true,
                  })
                }
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Sua senha"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            <When expr={isPending}>
              <Spinner />
              <When.Else>
                <LogIn size={20} />
                <span>Entrar</span>
              </When.Else>
            </When>
          </button>

          <p className="text-center text-sm text-gray-500 leading-relaxed">
            Ainda não possue uma conta?{" "}
            <Link to="/signup" className="text-purple-600 font-bold">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
