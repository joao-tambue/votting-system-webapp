import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";

import When from "../components/When";
import { Spinner } from "../components/Spinner";
import { handleApiError } from "../services/errors/handle-errors-api";
import { useVerifyEmail } from "../services/auth/verify-email-api";
import SignupSidebar from "../components/SignupSidebar";

const verifyEmailSchema = z.object({
  email: z.string().email("Email inválido"),
});

type VerifyEmailForm = z.infer<typeof verifyEmailSchema>;

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState<string>("");
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const emailFromState = (location.state as { email?: string })?.email || "";

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailForm>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: emailFromState,
    },
  });

  const { mutateAsync: verifyEmailMutate, isPending } = useVerifyEmail({
    onError: (error) => handleApiError(error, "Verificação"),
    onSuccess: () => {
      toast.success("Email verificado com sucesso! 🎉");
      navigate("/login", { replace: true });
    },
  });

  const OTP_LENGTH = 6;

  const handleOtpChange = (value: string, index: number) => {
    const newValue = value
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 1);

    const newCodeArray = code.split("");
    newCodeArray[index] = newValue;
    const updatedCode = newCodeArray.join("").slice(0, OTP_LENGTH);

    setCode(updatedCode);

    if (newValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, OTP_LENGTH);

    setCode(pasted);

    pasted.split("").forEach((char, i) => {
      if (inputRefs.current[i]) inputRefs.current[i].value = char;
    });

    if (pasted.length < OTP_LENGTH) {
      inputRefs.current[pasted.length]?.focus();
    } else {
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
  };

  const onSubmit = async (data: VerifyEmailForm) => {
    if (code.length !== OTP_LENGTH) {
      toast.error("Por favor, insira o código completo de 6 caracteres");
      return;
    }

    await verifyEmailMutate({
      email: data.email,
      code: code,
    });
  };

  useEffect(() => {
    code.split("").forEach((char, i) => {
      if (inputRefs.current[i]) inputRefs.current[i].value = char;
    });
  }, [code]);

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
              Verifique seu e-mail
            </h1>
            <p className="text-gray-600 text-sm">
              Digite o código de 6 caracteres que enviamos para o seu e-mail
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de verificação
              </label>
              <div className="flex gap-3 justify-center">
                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el!;
                    }}
                    type="text"
                    inputMode="text"
                    maxLength={1}
                    value={code[index] || ""}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-3xl font-semibold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none uppercase"
                  />
                ))}
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <When expr={isPending}>
                <Spinner />
                <When.Else>
                  <span>Verificar código</span>
                </When.Else>
              </When>
            </button>

            <p className="text-center text-sm text-gray-500">
              Já tem conta?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-purple-600 font-bold cursor-pointer hover:underline"
              >
                Fazer login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;