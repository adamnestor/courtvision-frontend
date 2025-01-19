import axios from "axios";
import { RateLimiter } from "../utils/rateLimiter";
import { secureStorage } from "../utils/secureStorage";
import { isTokenExpired } from "../utils/tokenUtils";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  token: string;
  email: string;
  role: "USER" | "ADMIN";
}

const API_URL = "http://localhost:8080/api/auth";

const refreshRateLimiter = new RateLimiter(10, 60 * 1000); // 10 refreshes per minute

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
    });
    if (response.data.token) {
      secureStorage.set("user", response.data);
    }
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  },

  logout() {
    secureStorage.remove("user");
  },

  getCurrentUser(): AuthResponse | null {
    const user = secureStorage.get("user");
    if (user?.token && isTokenExpired(user.token)) {
      this.logout();
      return null;
    }
    return user;
  },

  async refreshToken(): Promise<AuthResponse> {
    if (!refreshRateLimiter.canMakeRequest()) {
      throw new Error("Too many refresh attempts. Please login again.");
    }

    const user = this.getCurrentUser();
    if (!user?.token) throw new Error("No refresh token available");

    const response = await axios.post(
      `${API_URL}/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      }
    );

    if (response.data.token) {
      secureStorage.set("user", response.data);
    }
    return response.data;
  },
};

// Set up axios interceptor to add JWT token to requests
axios.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
