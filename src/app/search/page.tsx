'use client'

import { useDogsData } from '@/hooks/useDogsData';
import DogGrid from '@/components/DogGrid';
import CategorySelector from '@/components/CategorySelector';
import GridCardsPerPage from '@/components/GridCardsPerPage';
import AgeSelector from '@/components/AgeSelector';
import SortingSelector from '@/components/SortingSelector';
import { handleCategoryClick, handleSortChange, handleAgeChange, handleChangeCardsPerPage, handlePrevPage, handleNextPage } from '@/utils/dogHandlers';

export default function Search() {
  const {
    categories,
    selectedCategories,
    setSelectedCategories,
    setAgeRange,
    setSort,
    pagination,
    fetchDogsWithNav,
    optionsCardsPerPage,
    cardsPerPage,
    dogs,
    setCardsPerPage
  } = useDogsData();

  if (!categories) return <div>Loading...</div>

  return (
    <>
      <div className="w-1/4 text-sm pr-4">
        <CategorySelector items={categories} activeItems={selectedCategories} onItemClick={(category) => handleCategoryClick(category, selectedCategories, setSelectedCategories)} />
        <AgeSelector onAgeChange={(ageRange) => handleAgeChange(ageRange, setAgeRange)} />
      </div>
      <div className="w-3/4">
        <div className="flex justify-between mb-5">
          <GridCardsPerPage
            options={optionsCardsPerPage}
            activeOption={cardsPerPage}
            handleChange={(e) => handleChangeCardsPerPage(e, setCardsPerPage)}
          />
          <SortingSelector
            onSortChange={(sort) => handleSortChange(sort, setSort)}
          />
        </div>

        <DogGrid dogs={dogs} />
        <div className="flex">
          {pagination.prevPage && <button className="mr-auto" onClick={() => handlePrevPage(pagination.prevPage as string, fetchDogsWithNav)}>prev</button>}
          {pagination.nextPage && <button className="ml-auto" onClick={() => handleNextPage(pagination.nextPage as string, fetchDogsWithNav)}>next</button>}
        </div>

      </div>
    </>
  )
}