import { AgeRange, GridSort } from '@/types/Interfaces';

export const buildSearchQueryParams = (
  selectedCategoriesArr: string[], 
  ageRange: AgeRange, 
  sort: GridSort, 
  cardsPerPage: number
): string => {
  const queryParams = new URLSearchParams();
  if (selectedCategoriesArr.length) {
    selectedCategoriesArr.forEach(breed => queryParams.append('breeds', breed));
  }
  if (ageRange.ageMin) queryParams.append('ageMin', String(ageRange.ageMin));
  if (ageRange.ageMax) queryParams.append('ageMax', String(ageRange.ageMax));
  queryParams.append('size', cardsPerPage.toString());
  queryParams.append('sort', `${sort.field}:${sort.order}`);

  return `?${queryParams.toString()}`;
};