import { getPreviousMessages } from "@/api/messages/messagesApi";
import { PreviousMessagesResponse } from "@/types/message/interfaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UsePreviousMessagesResponse {
  data?: PreviousMessagesResponse;
  isPending: boolean;
  isError: boolean;
  error?: string;
  refetch: () => void;
}

const usePreviousMessages = (senderId: number, receiverId: number): UsePreviousMessagesResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    PreviousMessagesResponse,
    AxiosError<{ message?: string }>
  >({
    queryKey: ["previousMessages", senderId, receiverId],
    queryFn: () => getPreviousMessages({ senderId, receiverId }),
    enabled: !!senderId && !!receiverId,
    retry: 3,
  });

  return {
    data,
    isPending: isLoading,
    isError,
    error: error?.response?.data?.message || "Failed to fetch messages",
    refetch,
  };
};

export default usePreviousMessages;
