export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  token: string;
  role: UserRole;
}
