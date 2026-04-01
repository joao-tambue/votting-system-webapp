 import { toast } from "react-toastify";

export const handleApiError = (error: any, entity: string = "item") => {
  const errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.detail ||
    error?.message ||
    "Erro desconhecido";

  toast.error(`${entity}: ${errorMessage}`);
  console.error("API Error:", error.response?.data || error);
};