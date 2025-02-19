import {
  basicResponse,
  LoginResponse,
  MyDetailsResponse,
  SignupResponse,
} from "@/types/auth/interfaces";
import axiosInstance from "../axiosInstance";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import Cookies from "js-cookie";

export const register = async (data: {
  email: string;
  password: string;
  name: string;
  username: string;
}): Promise<SignupResponse> => {
  const response = await axiosInstance.post(`${baseUrl}/api/v1/user`, data);
  return response.data;
};

export const verifyEmail = async (data: {
  email: string;
  code: string;
}): Promise<basicResponse> => {
  const response = await axiosInstance.post(`${baseUrl}/api/v1/user/verify-email`, data);
  return response.data;
};

export const login = async (data: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`${baseUrl}/api/v1/user/login`, data);
  return response.data;
};

export const myDetails = async (): Promise<MyDetailsResponse> => {
  const response = await axiosInstance.get(`${baseUrl}/api/v1/user/me`);
  return response.data;
};

export const verifyToken = async (token: string): Promise<basicResponse> => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/user/verify-token/${token}`);
    return response.data;
  } catch (error) {
    return { success: false, message: "Invalid token!" };
  }
};
