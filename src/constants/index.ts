export const API_BASE_URL = "http://localhost:8080/api";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ADMIN_DASHBOARD: "/admin/dashboard",
  PICKS: "/picks",
  PLAYER_DETAIL: "/player/:playerId",
} as const;

export const TIME_PERIODS = {
  LAST_10: "L10",
  LAST_20: "L20",
  SEASON: "SEASON",
} as const;

export const CATEGORIES = {
  ALL: "ALL",
  POINTS: "POINTS",
  ASSISTS: "ASSISTS",
  REBOUNDS: "REBOUNDS",
} as const;
