import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
    try {
        const response = await fetch(url, options);

        if (response.status === 401) {
            sessionStorage.setItem("toastMessage", "Unauthorized access"); 
            window.location.href = "/";
        }

        if (!response.ok) {
            toast.error('Failed to fetch data');
        }

        return response.json();
    } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong");
        return Promise.reject(error);
    }
};