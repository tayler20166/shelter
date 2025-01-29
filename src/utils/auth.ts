export const logoutHandler = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
        const res = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (res.ok) {
            window.location.href = "/";
        } else {
            console.log('Logout failed with status:', res.status);
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error('Logout failed: ' + e.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
};
