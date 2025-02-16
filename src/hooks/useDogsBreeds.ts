import { useState, useEffect } from "react";
import { fetchData } from "@/utils/fetchData";
import { API_URL } from "@/constants";

export function useDogsBreeds() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBreeds() {
      setLoading(true);
      try {
        const data = await fetchData<string[]>(`${API_URL}/dogs/breeds`, { credentials: "include" });
        setCategories(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching dogs breeds");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBreeds();
  }, []);

  return { categories, loading, error };
}