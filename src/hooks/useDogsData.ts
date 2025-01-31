import { useState, useEffect } from "react";
import { Dog, SearchResult } from "@/types/Interfaces";
import { API_URL } from "@/constants";

export function useDogsData(searchResult: SearchResult | null) {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDogs() {
      setLoading(true);
      try {
        let data = [];
        if (!searchResult) return;

          const dogIDs = searchResult.resultIds;
          const response = await fetch(`${API_URL}/dogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dogIDs),
            credentials: "include",
          });
          if (!response.ok) throw new Error("Error fetching dogs");
          data = await response.json();
        setDogs(data);
      } catch (err) {
        setError("Error fetching dogs");
      } finally {
        setLoading(false);
      }
    }
    fetchDogs();
  }, [searchResult]);

  return {
    dogs
  };
}