import { getPreviousGroupMessages } from "@/api/group/groupApi";
import { PreviousMessagesResponse } from "@/types/message/interfaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UsePreviousGroupMessagesResponse {
  data?: PreviousMessagesResponse;
  isPending: boolean;
  isError: boolean;
  error?: string;
  refetch: () => void;
}

const usePreviousGroupMessages = (groupId: number): UsePreviousGroupMessagesResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    PreviousMessagesResponse,
    AxiosError<{ message?: string }>
  >({
    queryKey: ["previousGroupMessages", groupId],
    queryFn: () => getPreviousGroupMessages(groupId),
    enabled: !!groupId,
    retry: false,
  });

  return {
    data,
    isPending: isLoading,
    isError,
    error: error?.response?.data?.message || "Failed to fetch group messages",
    refetch,
  };
};

export default usePreviousGroupMessages;
