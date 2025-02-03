import { render, screen } from '@testing-library/react';
import Search from '@/app/search/page';
import { Dog, SearchResult } from '@/types/Interfaces';
import { useDogsData } from '@/hooks/useDogsData';
import { useDogsBreeds } from '@/hooks/useDogsBreeds';
import { useDogSearch } from '@/hooks/useDogSearch';
import { useFavorites } from '@/hooks/useFavorites';
jest.mock('@/hooks/useDogsData');
jest.mock('@/hooks/useDogsBreeds');
jest.mock('@/hooks/useDogSearch');
jest.mock('@/hooks/useFavorites');

const storedDogs: Dog[] = [
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_10225.jpg",
    name: "Yolanda",
    age: 13,
    breed: "Affenpinscher",
    zip_code: "21056",
    id: "NXGFTIcBOvEgQ5OCx8A1"
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_10437.jpg",
    name: "Wendell",
    age: 1,
    breed: "Affenpinscher",
    zip_code: "06104",
    id: "NnGFTIcBOvEgQ5OCx8A1"
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11365.jpg",
    name: "Lea",
    age: 11,
    breed: "Affenpinscher",
    zip_code: "36032",
    id: "RHGFTIcBOvEgQ5OCx8A1"
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11422.jpg",
    name: "Shanel",
    age: 9,
    breed: "Affenpinscher",
    zip_code: "47730",
    id: "RXGFTIcBOvEgQ5OCx8A1"
  },
];

const fetchedIDs = [
  "NXGFTIcBOvEgQ5OCx8A1",
  "NnGFTIcBOvEgQ5OCx8A1",
  "RHGFTIcBOvEgQ5OCx8A1",
  "NXGFTIcBOvEgQ5OCx8A1",
];

const categories = [
  "Affenpinscher",
  "Afghan Hound",
  "African Hunting Dog",
  "Airedale",
  "American Staffordshire Terrier",
  "Appenzeller",
  "Australian Terrier",
  "Basenji",
  "Basset",
];

const selectedCategories = [
  "Appenzeller",
  "Australian Terrier",
  "Basenji",
];

const searchResult: SearchResult = {
  prev: null,
  next: 'https://example.com/',
  resultIds: fetchedIDs,
  total: 4
};

const sortOptions = [
  { field: "breed", order: "asc", text: "Breed ↑ (Ascending)" },
  { field: "breed", order: "desc", text: "Breed ↓ (Descending)" },
];


describe('Search page', () => {
  const mockUseDogsData = useDogsData as jest.Mock;
  const mockUseDogsBreeds = useDogsBreeds as jest.Mock;
  const mockUseDogSearch = useDogSearch as jest.Mock;
  const mockUseFavorites = useFavorites as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();

    mockUseDogsData.mockReturnValue({
      dogs: storedDogs,
      loading: false,
      error: null,
    });

    mockUseDogsBreeds.mockReturnValue({
      categories: categories,
      loading: false,
      error: null,
    });

    mockUseDogSearch.mockReturnValue({
      selectedCategories: selectedCategories,
      setSelectedCategories: jest.fn(),
      ageRange: { ageMin: '', ageMax: '' },
      setAgeRange: jest.fn(),
      localAgeRange: { ageMin: '', ageMax: '' },
      setLocalAgeRange: jest.fn(),
      optionsCardsPerPage: [12, 24, 36],
      cardsPerPage: 12,
      setCardsPerPage: jest.fn(),
      fetchSearchResult: jest.fn(),
      searchResult: searchResult,
      pagination: { prevPage: null, nextPage: null },
      sortOptions: sortOptions,
      activeSortOption: sortOptions[0],
      handleSortChange: jest.fn(),
      setActiveSortOption: jest.fn(),
      loading: false,
      error: null,
    });

    mockUseFavorites.mockReturnValue({
      storedDogs: storedDogs,
      favoriteDogIds: ['NXGFTIcBOvEgQ5OCx8A1'],
      removeFavoriteDog: jest.fn(),
      toggleFavorite: jest.fn(),
    });

  });

  it('renders selector components correctly', () => {
    render(<Search />);
    const sortingSelectors = screen.getAllByTestId('sorting-selector');
    const ageSelectors = screen.getAllByTestId('age-selector');
    const pagesSelectors = screen.getAllByTestId('posts-per-page-selector');
    const categorySelectors = screen.getAllByTestId('category-selector');
    expect(sortingSelectors.length).toBe(2);
    expect(ageSelectors.length).toBe(2);
    expect(pagesSelectors.length).toBe(2);
    expect(categorySelectors.length).toBe(2);
  });

  it('renders grid with dogs after fetch', () => {
    render(<Search />);
    expect(screen.getByTestId('dog-grid')).toBeInTheDocument();
    const dogCards = screen.getAllByTestId('dog-card');
    expect(dogCards.length).toBeGreaterThan(0);
  });


});