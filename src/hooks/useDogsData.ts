import { useState, useEffect } from 'react';
import { Dog, DogIDs, AgeRange, GridSort } from '@/types/Interfaces';
import { buildSearchQueryParams } from '@/utils/queryBuilder';
import { fetchData } from '@/utils/fetchData';


export function useDogsData() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [dogsIDs, setDogsIDs] = useState<DogIDs | null>(null);
  const optionsCardsPerPage = [12, 24, 36];
  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    prevPage: string | null;
    nextPage: string | null;
  }>({
    prevPage: null,
    nextPage: null
  });
  const [ageRange, setAgeRange] = useState<AgeRange>({ ageMin: '', ageMax: '' });

  const [sortOptions, setSortOptions] = useState<GridSort[]>([
    {
      field: 'breed',
      order: 'asc',
      text: 'Breed ↑ (Ascending)'
    },
    {
      field: 'breed',
      order: 'desc',
      text: 'Breed ↓ (Descending)'
    },
  ]);
  const [activeSortOption, setActiveSortOption] = useState<GridSort>({
    field: 'breed',
    order: 'asc',
    text: 'Breed ↑ (Ascending)'
  });
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split(':');

    const newSortOption = sortOptions.find(
      (option) => option.field === field && option.order === order
    );

    if (newSortOption) {
      setActiveSortOption(newSortOption);
    }
  };
  const [isFirstRun, setIsFirstRun] = useState(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const cachedBreeds = localStorage.getItem('breeds');
        if (cachedBreeds) {
          setCategories(JSON.parse(cachedBreeds));
        } else {
          const data = await fetchData<string[]>(`${API_BASE_URL}/dogs/breeds`, { credentials: 'include' });
          setCategories(data);
          localStorage.setItem('breeds', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Error fetching breeds:', err);
      }
      fetchDogsIDs([], ageRange, activeSortOption, cardsPerPage);
    }

    fetchBreeds();
  }, [API_BASE_URL]);

  useEffect(() => {
    console.log(ageRange);
    
    if (isFirstRun) {
      setIsFirstRun(false);
      return;
    }
    if (selectedCategories.length > 0) {
      fetchDogsIDs(selectedCategories, ageRange, activeSortOption, cardsPerPage);
    } else {
      fetchDogsIDs([], ageRange, activeSortOption, cardsPerPage);
    }
  }, [selectedCategories, ageRange, activeSortOption, cardsPerPage]);

  const fetchDogsIDs = async (selectedCategoriesArr: string[], ageRange: AgeRange, activeSortOption: GridSort, cardsPerPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = buildSearchQueryParams(selectedCategoriesArr, ageRange, activeSortOption, cardsPerPage);
      const searchResult = await fetchData<DogIDs>(`${API_BASE_URL}/dogs/search${queryParams}`, {
        method: 'GET',
        credentials: 'include',
      });
      setDogsIDs(searchResult);
      setPagination({
        prevPage: searchResult.prev || null,
        nextPage: searchResult.next || null
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDogsIDsWithNav = async (link: string | null) => {
    if (link) {
      try {
        const searchResult = await fetchData<DogIDs>(`${API_BASE_URL}${link}`, {
          method: 'GET',
          credentials: 'include',
        });
        setDogsIDs(searchResult);
        setPagination({
          prevPage: searchResult.prev || null,
          nextPage: searchResult.next || null
        });
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          console.error('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    async function fetchDogs() {
      if (dogsIDs) {
        try {
          const response = await fetch(`${API_BASE_URL}/dogs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dogsIDs.resultIds),
            credentials: 'include'
          });
          if (response.status == 401) {
            window.location.href = "/"
          }
          if (!response.ok) {
            throw new Error('Error fetching second data');
          }
          const secondResult = await response.json();
          setDogs(secondResult);
        } catch (error) {
          console.error('Error fetching breeds:', error);
        }
      }
    };
    fetchDogs();
  }, [dogsIDs, API_BASE_URL]);




 



 





  return { categories, selectedCategories, setSelectedCategories, dogs, fetchDogsIDs, ageRange, setAgeRange, loading, error, fetchDogsIDsWithNav, optionsCardsPerPage, cardsPerPage, setCardsPerPage, pagination, setPagination, sortOptions, activeSortOption, handleSortChange };
}