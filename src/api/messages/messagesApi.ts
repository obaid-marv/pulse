import { basicResponse } from "@/types/auth/interfaces";
import axiosInstance from "../axiosInstance";
import { baseUrl } from "../baseUrl";
import { PreviousMessagesResponse } from "@/types/message/interfaces";

export const getPreviousMessages = async (data: { senderId: number; receiverId: number }): Promise<PreviousMessagesResponse> => {
    const response = await axiosInstance.get(
      `${baseUrl}/api/v1/message/messages?senderId=${data.senderId}&receiverId=${data.receiverId}`
    );
    return response.data;
  };
  