import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Match from '@/app/match/page';
import { useFavorites } from '@/hooks/useFavorites';
import { fetchData } from '@/utils/fetchData';
import { Dog, Match as MatchResult } from '@/types/Interfaces';

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
const fetchedMatch: MatchResult = {
  match: "WXGFTIcBOvEgQ5OCx8A2"
}


describe('Match Component', () => {
  const mockUseFavorites = useFavorites as jest.Mock;
  const mockFetchData = fetchData as jest.Mock;

  let removeFavoriteDog: jest.Mock;
  let toggleFavorite: jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    removeFavoriteDog = jest.fn();
    toggleFavorite = jest.fn(dog => removeFavoriteDog(dog));
    mockUseFavorites.mockReturnValue({
      storedDogs: storedDogs,
      removeFavoriteDog,
      toggleFavorite,
      favoriteDogIds: ['NXGFTIcBOvEgQ5OCx8A1'],
    });

    mockFetchData.mockResolvedValueOnce(storedDogs2).mockResolvedValueOnce(storedDogs2);
  });

  it('renders page key elements correctly', () => {
    render(<Match />);
    expect(screen.getByText('Your Favorite Dogs')).toBeInTheDocument();
    expect(screen.getByText('PUSH THE BUTTON')).toBeInTheDocument();
    expect(screen.getByTestId('dog-grid')).toBeInTheDocument();
    const dogCards = screen.getAllByTestId('dog-card');
    expect(dogCards.length).toBeGreaterThan(0);
    expect(screen.getByTestId('dog-button-popup')).toBeInTheDocument();
  });

  it('displays a dialog with matched dog data when the button is clicked', async () => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
    render(<Match />);
    const button = screen.getByTestId('dog-button-popup');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(2);
      expect(screen.getByTestId('dog-popup')).toBeInTheDocument();
      expect(screen.getByTestId('dog-grid-card-match')).toBeInTheDocument();
    });
  });


  it('calls toggleFavorite when favorite button is clicked', async () => {
    render(<Match />);

    const favoriteButton = screen.getAllByTestId('toggle-favorite-dog-button')[0];
    fireEvent.click(favoriteButton);

    expect(toggleFavorite).toHaveBeenCalledTimes(1);
    expect(toggleFavorite).toHaveBeenCalledWith(storedDogs[0]); // Check correct dog

  });

  it('calls removeFavoriteDog when favorite button is clicked', async () => {
    render(<Match />);

    const favoriteButton = screen.getAllByTestId('cancel-dog-button')[0];
    fireEvent.click(favoriteButton);

    expect(removeFavoriteDog).toHaveBeenCalledTimes(1);
    expect(removeFavoriteDog).toHaveBeenCalledWith(storedDogs[0]); // Check correct dog

  });

  it('sends request when the match button is clicked', async () => {
    HTMLDialogElement.prototype.showModal = jest.fn();


    render(<Match />);

    fireEvent.click(screen.getByTestId('dog-button-popup'));

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledTimes(2);
      expect(fetchData).toHaveBeenCalledWith(expect.stringContaining('/dogs/match'), expect.any(Object));
      expect(fetchData).toHaveBeenCalledWith(expect.stringContaining('/dogs'), expect.any(Object));
    });

    expect(screen.getByTestId('dog-popup')).toBeInTheDocument();
  });

  it('closes the dialog when the close button is clicked', async () => {
    render(<Match />);

    fireEvent.click(screen.getByTestId('dog-button-popup'));
    await waitFor(() => {
      expect(screen.getByTestId('dog-popup')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('dog-button-close-popup'));
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('dog-popup')).not.toHaveAttribute('open');
  });
});