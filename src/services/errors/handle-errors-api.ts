// import { AxiosError } from "axios";
 import { toast } from "react-toastify";

// export function handleApiError(error: unknown, msg: string) {
//   if (error instanceof AxiosError) {
//     const status = error.response?.status;

//     if (status === 404) {
//       toast.error(`${msg} não encontrado`);
//     } else if (status && status >= 500) {
//       toast.error("Erro do servidor, por favor tente novamente");
//     } else if (status && status >= 400) {
//       toast.error(
//         "Ops!, cometeu um erro, certifica que está enviando correctamente os dados"
//       );
//     } else if (error.code === "ERR_NETWORK") {
//       toast.error(
//         "Ops!, algo deu errado com a internet, por favor verifique a tua conexão a internet"
//       );
//     }
//   }
// }

// services/errors/handle-errors-api.ts
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