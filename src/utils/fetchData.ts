export const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, options);
    if (response.status == 401) { 
        localStorage.removeItem("logged");
        window.location.href = "/";
     }
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
};