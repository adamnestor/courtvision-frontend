import axios, { AxiosError } from "axios";
import { authService } from "./authService";
import {
  ApiResponse,
  CreatePickRequest,
  PickResponse,
  ErrorResponse,
} from "../types/api";
import { isApiResponse, isPickResponse } from "../utils/type-guards";
import { toast } from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  raxConfig: {
    retry: 3,
    retryDelay: 3000,
    statusCodesToRetry: [[408, 429, 500, 502, 503, 504]],
  },
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const handleError = (error: AxiosError<ErrorResponse>) => {
  if (error.response?.data && !isErrorResponse(error.response.data)) {
    console.error(
      "Received invalid error response format",
      error.response.data
    );
    throw new Error("Invalid error response format from server");
  }

  if (error.response?.status === 401) {
    // Handle unauthorized
    authService.logout();
    window.location.href = "/login";
    return;
  }

  const message = error.response?.data?.message || "An error occurred";
  const errors = error.response?.data?.errors;

  toast.error(message);
  throw new ApiError(message, error.response?.status, undefined, errors);
};

api.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user?.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const cacheControl = response.headers["cache-control"];
    if (cacheControl) {
      // React Query will respect these cache settings
    }
    return response;
  },
  (error) => handleError(error)
);

export const createSinglePick = async (
  data: CreatePickRequest
): Promise<ApiResponse<PickResponse>> => {
  const response = await api.post<ApiResponse<PickResponse>>("/picks", {
    ...data,
    isParlay: false,
  });
  if (!isApiResponse(response.data, isPickResponse)) {
    throw new Error("Invalid pick response format from server");
  }
  return response.data;
};

export const createParlay = async (
  picks: CreatePickRequest[]
): Promise<ApiResponse<PickResponse[]>> => {
  const response = await api.post<ApiResponse<PickResponse[]>>(
    "/picks/parlay",
    picks
  );
  if (
    !isApiResponse(response.data, (data): data is PickResponse[] => {
      return Array.isArray(data) && data.every(isPickResponse);
    })
  ) {
    throw new Error("Invalid parlay response format from server");
  }
  return response.data;
};

export const getUserPicks = async () => {
  const response = await api.get<ApiResponse<PickResponse>>("/picks");
  if (!isApiResponse(response.data, isPickResponse)) {
    throw new Error("Invalid pick response format from server");
  }
  return response;
};

export const deletePick = async (id: number): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/picks/${id}`);
  if (
    !isApiResponse(response.data, (data): data is void => data === undefined)
  ) {
    throw new Error("Invalid delete response format from server");
  }
  return response.data;
};

export const deleteParlay = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/picks/parlay/${id}`);
  if (
    !isApiResponse(response.data, (data): data is void => data === undefined)
  ) {
    throw new Error("Invalid delete response format from server");
  }
  return response.data;
};

export default api;
