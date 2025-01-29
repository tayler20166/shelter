'use client'

import { useDogsData } from '@/hooks/useDogsData';
import DogGrid from '@/components/DogGrid';
import CategorySelector from '@/components/CategorySelector';
import GridCardsPerPage from '@/components/GridCardsPerPage';
import AgeSelector from '@/components/AgeSelector';
import SortingSelector from '@/components/SortingSelector';
import { handleCategoryClick, handleSortChange, handleAgeChange, handleChangeCardsPerPage, handlePrevPage, handleNextPage } from '@/utils/dogHandlers';
import { useRef } from 'react';

export default function Search() {
  const {
    categories,
    selectedCategories,
    setSelectedCategories,
    setAgeRange,
    ageRange,
    pagination,
    fetchDogsIDsWithNav,
    optionsCardsPerPage,
    cardsPerPage,
    dogs,
    setCardsPerPage,
    sortOptions,
    activeSortOption,
    handleSortChange
  } = useDogsData();

  const sortingDialogRef = useRef<HTMLDialogElement>(null);

  if (!categories) return <div>Loading...</div>

  return (
    <>
      <div className="hidden sm:block w-1/4 text-sm pr-4">
        <CategorySelector
          items={categories}
          activeItems={selectedCategories}
          onItemClick={(category) => handleCategoryClick(category, selectedCategories, setSelectedCategories)}
          idPrefix="desktop"
        />
        <AgeSelector 
           ageRange={ageRange}
           onAgeChange={setAgeRange} 
        />
      </div>
      <div className="w-full sm:w-3/4">
        <div className="flex justify-between mb-5">
          <button
            className="block sm:hidden bg-gray-800 text-white px-4 py-2 rounded-md"
            onClick={() => sortingDialogRef.current?.showModal()}
          >
            Open Sorting Options
          </button>

          <div className="hidden sm:flex justify-between w-full">
            <GridCardsPerPage
              options={optionsCardsPerPage}
              activeOption={cardsPerPage}
              handleChange={(e) => handleChangeCardsPerPage(e, setCardsPerPage)}
              idPrefix="desktop"
            />
            <SortingSelector
              options={sortOptions}
              activeOption={activeSortOption}
              onSortChange={handleSortChange}
              idPrefix="desktop"
            />
          </div>
        </div>

        <DogGrid dogs={dogs} />
        <div className="flex">
          {pagination.prevPage && <button className="mr-auto" onClick={() => handlePrevPage(pagination.prevPage as string, fetchDogsIDsWithNav)}>prev</button>}
          {pagination.nextPage && <button className="ml-auto" onClick={() => handleNextPage(pagination.nextPage as string, fetchDogsIDsWithNav)}>next</button>}
        </div>
      </div>

      <dialog ref={sortingDialogRef} className="bg-white rounded-md p-5 w-4/5 max-w-md">
        <h3 className="text-lg font-bold mb-4">Sorting Options</h3>

        <CategorySelector
          items={categories}
          activeItems={selectedCategories}
          onItemClick={(category) => handleCategoryClick(category, selectedCategories, setSelectedCategories)}
          idPrefix="mobile"
        />
        <AgeSelector 
        ageRange={ageRange}
        onAgeChange={setAgeRange} 
        />
        <GridCardsPerPage
          className="mb-4 mt-3"
          options={optionsCardsPerPage}
          activeOption={cardsPerPage}
          handleChange={(e) => handleChangeCardsPerPage(e, setCardsPerPage)}
          idPrefix="mobile"
        />
        <SortingSelector
          className="mb-4"
          options={sortOptions}
          activeOption={activeSortOption}
          onSortChange={handleSortChange}
          idPrefix="mobile"
        />
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
          onClick={() => sortingDialogRef.current?.close()}
        >
          Close
        </button>
      </dialog>
    </>
  )
}