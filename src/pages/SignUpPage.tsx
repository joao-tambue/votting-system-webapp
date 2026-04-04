import React, { useState } from "react";

import { z } from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import When from "../components/When";
import { Spinner } from "../components/Spinner";
import { Eye, EyeOff, Mail, Lock, LogIn, User } from "lucide-react";
import { handleApiError } from "../services/errors/handle-errors-api";

import SignupSidebar from "../components/SignupSidebar";
import { useRegisterVoter } from "../services/auth/signup-user-api";

const signUpUserSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(3, "Nome precisa conter no mínimo 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SignUpUserForm = z.infer<typeof signUpUserSchema>;

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SignUpUserForm>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: registerVoter, isPending } = useRegisterVoter({
    onError: (error) => handleApiError(error, "Cadastro"),
    onSuccess: (data, variables) => {
      toast.success("Cadastro realizado! Verifique seu e-mail para ativar a conta.");
      reset();

      navigate("/verify-email", {
        state: { email: variables.email },
      });
    },
  });

  const handleSignUp = async (data: SignUpUserForm) => {
    await registerVoter({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="hidden md:flex">
        <SignupSidebar />
      </div>

      <div className="flex-1 flex items-center justify-center px-2 py-12">
        <div className="p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img
              src="/logo-caf.png"
              alt="CAF Logo"
              className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-gray-300"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              CAF Voting System
            </h1>
            <p className="text-gray-600 text-sm">
              Sistema de Votação do Colégio Árvore da Felicidade
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            {/* Nome, Email e Senha (igual ao que você já tinha) */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={watch("name")}
                  onChange={(e) => setValue("name", e.target.value, { shouldValidate: true })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={watch("email")}
                  onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={watch("password")}
                  onChange={(e) => setValue("password", e.target.value, { shouldValidate: true })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <When expr={isPending}>
                <Spinner />
                <When.Else>
                  <LogIn size={20} />
                  <span>Criar conta</span>
                </When.Else>
              </When>
            </button>

            <p className="text-center text-sm text-gray-500">
              Já tenho uma conta?{" "}
              <Link to="/login" className="text-purple-600 font-bold hover:underline">
                Fazer login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;