import { getAllGroups } from "@/api/group/groupApi";
import { AllGroupsResponse } from "@/types/group/Interfaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseAllGroupsResponse {
  data?: AllGroupsResponse;
  isPending: boolean;
  isError: boolean;
  error?: string;
  refetch: () => void;
}

const useAllGroups = (): UseAllGroupsResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    AllGroupsResponse,
    AxiosError<{ message?: string }>
  >({
    queryKey: ["allGroups"],
    queryFn: getAllGroups,
    retry: false,
  });

  return {
    data,
    isPending: isLoading,
    isError,
    error: error?.response?.data?.message || "Failed to fetch groups",
    refetch,
  };
};

export default useAllGroups;
