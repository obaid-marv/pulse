import { PreviousMessagesResponse } from "@/types/message/interfaces";
import axiosInstance from "../axiosInstance";
import { baseUrl } from "../baseUrl";
import { AllGroupsResponse } from "@/types/group/Interfaces";

export const getAllGroups = async (): Promise<AllGroupsResponse> => {
  const response = await axiosInstance.get(`${baseUrl}/api/v1/group`);
  return response.data;
};

export const getPreviousGroupMessages = async (
  groupId: number
): Promise<PreviousMessagesResponse> => {
  const response = await axiosInstance.get(
    `${baseUrl}/api/v1/message/group-messages?groupId=${groupId}`
  );
  return response.data;
};
