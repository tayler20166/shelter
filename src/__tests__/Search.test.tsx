import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Search from '@/app/search/page';
import { useFavorites } from '@/hooks/useFavorites';
import { fetchData } from '@/utils/fetchData';
import { AgeRange, Dog, GridSort } from '@/types/Interfaces';

jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));


jest.mock('@/utils/fetchData', () => ({
  fetchData: jest.fn(),
}));


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
const storedDogs2: Dog[] = [
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11875.jpg",
    name: "Nestor",
    age: 7,
    breed: "Affenpinscher",
    zip_code: "08014",
    id: "VXGFTIcBOvEgQ5OCx8A2"
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_12070.jpg",
    name: "Jaunita",
    age: 9,
    breed: "Affenpinscher",
    zip_code: "79345",
    id: "WXGFTIcBOvEgQ5OCx8A2"
  }
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


jest.mock('@/hooks/useDogsData', () => ({
  useDogsData: jest.fn(),
}));

import { useDogsData } from '@/hooks/useDogsData';
const mockUseDogsData = useDogsData as jest.Mock;



describe('Search Component', () => {
  const mockUseFavorites = useFavorites as jest.Mock;
  const mockFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
  let removeFavoriteDog: jest.Mock;
  let toggleFavorite: jest.Mock;

  const pagination = {
    prevPage: null,
    nextPage: null
  };

  beforeEach(() => {
    jest.resetAllMocks();
    removeFavoriteDog = jest.fn();
    toggleFavorite = jest.fn(dog => removeFavoriteDog(dog));


    mockUseDogsData.mockReturnValue({
      categories: categories,
      selectedCategories: selectedCategories,
      pagination: { prevPage: null, nextPage: null },
      optionsCardsPerPage: [12, 24, 36],
      cardsPerPage: 12,
      dogs: storedDogs,
      fetchDogsWithNav: jest.fn(),
      loading: false,
      error: null,
      ageRange: { ageMin: '', ageMax: '' },
      setAgeRange: jest.fn(),
      sort: { field: 'breed', order: 'asc' },
      setSort: jest.fn(),
      setSelectedCategories: jest.fn(),
      setPagination: jest.fn(),
      setCardsPerPage: jest.fn(),
      fetchDogs: async () => {
        await fetchData('/dogs/breeds');
        await fetchData('/dogs/search');
        await fetchData('/dogs');
      },
    });

    mockUseFavorites.mockReturnValue({
      storedDogs: storedDogs,
      removeFavoriteDog,
      toggleFavorite,
      favoriteDogIds: ['NXGFTIcBOvEgQ5OCx8A1'],
    });
    mockFetchData
      .mockResolvedValueOnce(categories)
      .mockResolvedValueOnce(fetchedIDs)
      .mockResolvedValueOnce(storedDogs);

  });

  it('renders page key elements correctly', () => {
   
    render(<Search />);
    expect(screen.getByTestId('sorting-selector')).toBeInTheDocument();
    expect(screen.getByTestId('age-selector')).toBeInTheDocument();
    expect(screen.getByTestId('posts-per-page-selector')).toBeInTheDocument();
    expect(screen.getByTestId('category-selector')).toBeInTheDocument();

  });

  it('sends requests on page load', async () => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    await act(async () => {
      render(<Search />);
      const { fetchDogs } = useDogsData(); 
      await fetchDogs(); 
    });

    await waitFor(() => {
      console.log('FetchData Calls:', mockFetchData.mock.calls);
      expect(mockFetchData).toHaveBeenCalledTimes(3);
      
    });

    expect(screen.getByTestId('dog-grid')).toBeInTheDocument();
    const dogCards = screen.getAllByTestId('dog-card');
    expect(dogCards.length).toBeGreaterThan(0);
  });


});