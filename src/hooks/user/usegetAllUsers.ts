import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";// Adjust the import based on your actual type definition
import { getAllUsers } from "@/api/user/userApi"; // Adjust the import based on your actual API function
import { allUsersResponse } from "@/types/auth/interfaces";

interface UseAllUsersResponse {
  data?: allUsersResponse;
  isPending: boolean;
  isError: boolean;
  error?: string;
  refetch: () => void;
}

const useAllUsers = (): UseAllUsersResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<allUsersResponse, AxiosError<{
    message?: string;
  }>>({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
    retry: false,
  });

  return {
    data,
    isPending: isLoading,
    isError,
    error: error?.response?.data?.message || "Failed to fetch users",
    refetch,
  };
};

export default useAllUsers;