import {
  AdminStatsResponse,
  ErrorResponse,
  ApiResponse,
  PickResponse,
} from "../types/api";

export function isErrorResponse(response: unknown): response is ErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "status" in response &&
    "message" in response &&
    "timestamp" in response
  );
}

export function isAdminStatsResponse(
  response: unknown
): response is AdminStatsResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "totalUsers" in response &&
    "systemHealth" in response &&
    "performanceMetrics" in response &&
    typeof (response as AdminStatsResponse).totalUsers === "number" &&
    typeof (response as AdminStatsResponse).systemHealth === "object" &&
    typeof (response as AdminStatsResponse).performanceMetrics === "object"
  );
}

export function isApiResponse<T>(
  response: unknown,
  validator: (data: unknown) => data is T
): response is ApiResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "data" in response &&
    "status" in response &&
    "timestamp" in response &&
    validator((response as ApiResponse<T>).data)
  );
}

export function isPickResponse(response: unknown): response is PickResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "id" in response &&
    "playerId" in response &&
    "category" in response &&
    "threshold" in response &&
    "hitRateAtPick" in response &&
    "playerName" in response &&
    "team" in response &&
    "opponent" in response &&
    "createdAt" in response
  );
}
