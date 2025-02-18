import { allUsersResponse } from "@/types/auth/interfaces";
import axiosInstance from "../axiosInstance";
import { baseUrl } from "../baseUrl";

export const getAllUsers = async (): Promise<allUsersResponse> => {
    const response = await axiosInstance.get(`${baseUrl}/api/v1/user`)
    return response.data
  };
