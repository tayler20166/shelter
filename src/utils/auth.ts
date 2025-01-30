import { API_URL } from "@/constants";
export const logoutHandler = async () => {

    try {
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (res.ok) {
            window.location.href = "/";
        } 
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error('Logout failed: ' + e.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
};
