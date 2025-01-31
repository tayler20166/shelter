import { useState, useEffect } from "react";
import { SearchResult, AgeRange, GridSort, Pagination } from "@/types/Interfaces";
import { buildSearchQueryParams } from "@/utils/queryBuilder";
import { fetchData } from "@/utils/fetchData";
import { API_URL } from "@/constants";

export function useDogSearch() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [ageRange, setAgeRange] = useState<AgeRange>({ ageMin: "", ageMax: "" });
  const [localAgeRange, setLocalAgeRange] = useState<AgeRange>({ ageMin: "", ageMax: "" });
  const [sortOptions] = useState<GridSort[]>([
    { field: "breed", order: "asc", text: "Breed ↑ (Ascending)" },
    { field: "breed", order: "desc", text: "Breed ↓ (Descending)" },
  ]);
  const optionsCardsPerPage = [12, 24, 36];
  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [activeSortOption, setActiveSortOption] = useState<GridSort>(sortOptions[0]);
  const [pagination, setPagination] = useState<Pagination>({ prevPage: null, nextPage: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split(':');

    const newSortOption = sortOptions.find(
      (option) => option.field === field && option.order === order
    );

    if (newSortOption) {
      setActiveSortOption(newSortOption);
    }
  };

  const fetchSearchResult = async (link?: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const searchResult = link ? await fetchSearchResultWithNav(link as string) : await fetchSearchResultWithParams();
      setSearchResult(searchResult);
      setPagination({ prevPage: searchResult.prev || null, nextPage: searchResult.next || null });
    } catch (err) {
      setError("Error fetching dog IDs");
    } finally {
      setLoading(false);
    }
  };
  const fetchSearchResultWithParams = async () => {
    const queryParams = buildSearchQueryParams(selectedCategories, ageRange, activeSortOption, cardsPerPage);
    return await fetchData<SearchResult>(`${API_URL}/dogs/search${queryParams}`, { credentials: "include" });
  };

  const fetchSearchResultWithNav = async (link: string) => {
    return await fetchData<SearchResult>(link, { credentials: "include" });
  };

  useEffect(() => {
    fetchSearchResult();
  }, [selectedCategories, ageRange, activeSortOption]);

  return {
    selectedCategories,
    setSelectedCategories,
    ageRange, setAgeRange,
    localAgeRange,
    setLocalAgeRange,
    fetchSearchResult,
    optionsCardsPerPage, 
    cardsPerPage, 
    setCardsPerPage, 
    searchResult, 
    sortOptions, 
    activeSortOption, 
    handleSortChange, 
    setActiveSortOption, 
    pagination,
    loading, 
    error
  };
}