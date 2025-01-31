import { AgeRange, GridSort } from '@/types/Interfaces';

export const handleCategoryClick = (category: string, selectedCategories: string[], setSelectedCategories: (val: string[]) => void) => {
    const updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((item) => item !== category)
        : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
};

export const handleSortChange = (sort: GridSort, setSortParam: (sort: GridSort) => void) => {
    setSortParam(sort);
};

export const handleAgeChange = (ageRange: AgeRange, setAgeRange: (ageRange: AgeRange) => void) => {
    setAgeRange(ageRange);
};

export const handleChangeCardsPerPage = (e: React.ChangeEvent<HTMLSelectElement>, setCardsPerPage: (num: number) => void) => {
    setCardsPerPage(Number(e.target.value));
};

export const handlePrevPage = (prevPage: string, fetchSearchResult: (link: string) => void) => {
    fetchSearchResult(prevPage);
};
export const handleNextPage = (nextPage: string, fetchSearchResult: (link: string) => void) => {
    fetchSearchResult(nextPage);
};