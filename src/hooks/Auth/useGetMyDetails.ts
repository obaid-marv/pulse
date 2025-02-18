import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MyDetailsResponse } from "@/types/auth/interfaces";
import { myDetails } from "@/api/auth/authApi";

interface UseMyDetailsResponse {
  data?: MyDetailsResponse;
  isPending: boolean;
  isError: boolean;
  error?: string;
  refetch: () => void;
}

const useMyDetails = (): UseMyDetailsResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<MyDetailsResponse, AxiosError<{
    message?: string;
  }>>({
    queryKey: ["myDetails"], 
    queryFn: myDetails,
    retry: false,
  });

  return {
    data,
    isPending: isLoading,
    isError,
    error: error?.response?.data?.message || "Failed to fetch user details",
    refetch,
  };
};

export default useMyDetails;