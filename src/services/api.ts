import axios from "axios";
import { authService } from "./authService";
import { ApiResponse, CreatePickRequest, PickResponse } from "../types/api";

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
