import { getAuthenticatedUser, removeUser } from "./localStorage";
import { navigate } from "./navigate";
export const checkAuthUser = (loginRoute, unauthorizedRoute, requiredRole) => {
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
export const logout = () => {
    removeUser();
    navigate("../../auth/login/login.html");
};
