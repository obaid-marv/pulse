import { AxiosError } from "axios";
import { ApiError } from "./auth/interfaces";

interface ErrorResponseData {
  message?: string;
  statusCode?: number;
}

export const isApiError = (error: unknown): error is AxiosError<ErrorResponseData> => {
  return error instanceof AxiosError && !!error.response;
};

export interface error {
  path: string[];
  message: string;
}
export interface validationError {
  response: { data: { errors: error[] } };
}
