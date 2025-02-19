import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { verifyEmail } from "@/api/auth/authApi";
import { basicResponse } from "@/types/auth/interfaces";
import Cookies from "js-cookie";

interface UseVerifyEmailResponse {
  verify: (data: { email: string; code: string }) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  error?: string;
  data?: basicResponse;
  reset: () => void;
}

const useVerifyEmail = (onSuccess: () => void): UseVerifyEmailResponse => {
  const mutation = useMutation<
    basicResponse,
    AxiosError<{ message?: string }>,
    { email: string; code: string }
  >({
    mutationFn: verifyEmail,
    onSuccess: () => {
      Cookies.set("isVerified", "true");
      onSuccess();
    },
  });

  return {
    verify: async (data) => {
      await mutation.mutateAsync(data);
    },
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.response?.data?.message || "Verification failed",
    data: mutation.data,
    reset: mutation.reset,
  };
};

export default useVerifyEmail;
