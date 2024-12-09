import axios from "axios";
import { authService } from "./authService";
import { ApiResponse, CreatePickRequest, PickResponse } from "../types/api";
import { UserPickDTO } from "../types/picks";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
      // For debugging
      console.log("Adding token to request:", config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createSinglePick = async (
  data: CreatePickRequest
): Promise<ApiResponse<PickResponse>> => {
  const response = await api.post<ApiResponse<PickResponse>>("/picks", {
    ...data,
    isParlay: false,
  });
  return response.data;
};

export const getUserPicks = async (): Promise<ApiResponse<UserPickDTO[]>> => {
  const response = await api.get<ApiResponse<UserPickDTO[]>>("/picks");
  return response.data;
};

export const deletePick = async (id: number): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/picks/${id}`);
  return response.data;
};

export const deleteParlay = async (id: number): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/parlays/${id}`);
  return response.data;
};

export default api;
