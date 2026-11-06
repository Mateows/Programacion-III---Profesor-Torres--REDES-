import { getAuthenticatedUser } from "./utils/localStorage";
import { navigate } from "./utils/navigate";

export const protectRoute = (): void => {
  const path = window.location.pathname;
  const user = getAuthenticatedUser();

  if (!user && (path.includes("/admin/") || path.includes("/client/"))) {
    navigate("../../auth/login/login.html");
    return;
  }
  if (user?.role === "client" && path.includes("/admin/")) {
    navigate("../../client/home/home.html");
  }
};

protectRoute();