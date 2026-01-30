import { userCookieSettings } from "../../utils/user.cookie.settings";

export default defineNuxtRouteMiddleware((to, from) => {
    // Only check admin routes
    if (!to.path.startsWith("/admin")) {
        return;
    }

    // Get user from cookie
    const userCookie = useCookie("user", userCookieSettings);
    const user = userCookie.value?.data?.user;

    // If no user or not authenticated, redirect to signin
    if (!user) {
        return navigateTo("/auth/signin");
    }

    // Check if user is admin
    const userRole = user?.role;

    if (userRole !== "ADMIN") {
        // Not admin - redirect to home page
        return navigateTo("/");
    }

    // User is admin, allow access
});
