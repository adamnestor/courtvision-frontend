import axios, { AxiosError } from "axios";
import { authService } from "./authService";
import { ApiResponse, CreatePickRequest, PickResponse } from "../types/api";
import { toast } from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

const handleError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    // Handle unauthorized
    authService.logout();
    window.location.href = "/login";
    return;
  }

  const message = error.response?.data?.message || "An error occurred";
  toast.error(message);
  throw new ApiError(message, error.response?.status);
};

api.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user?.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
      // For debugging
      console.log("Adding token to request:", config.headers.Authorization);
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
      console.log("Cache-Control:", cacheControl);
    }
    return response;
  },
  (error) => handleError(error)
);

export const createSinglePick = async (
  data: CreatePickRequest
): Promise<ApiResponse<PickResponse>> => {
  console.log("Sending pick request:", data);
  console.log("Current auth token:", authService.getCurrentUser()?.token);
  const response = await api.post<ApiResponse<PickResponse>>("/picks", {
    ...data,
    isParlay: false,
  });
  return response.data;
};

export const createParlay = async (
  picks: CreatePickRequest[]
): Promise<ApiResponse<PickResponse[]>> => {
  const response = await api.post<ApiResponse<PickResponse[]>>(
    "/picks/parlay",
    picks
  );
  return response.data;
};

export const getUserPicks = async () => {
  const response = await api.get<ApiResponse<PickResponse>>("/picks");
  return response;
};

export const deletePick = async (id: number): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/picks/${id}`);
  return response.data;
};

export const deleteParlay = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/picks/parlay/${id}`);
  return response.data;
};

export default api;
