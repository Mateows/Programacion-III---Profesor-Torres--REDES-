import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getAuthenticatedUser, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuthUser = (
  loginRoute: string,
  unauthorizedRoute: string,
  requiredRole: Rol
): IUser | null => {
  const user = getAuthenticatedUser();
  if (!user) {
    navigate(loginRoute);
    return null;
  }
  if (user.role !== requiredRole) {
    navigate(unauthorizedRoute);
    return null;
  }
  return user;
};

export const logout = (): void => {
  removeUser();
  navigate("../../auth/login/login.html");
};
