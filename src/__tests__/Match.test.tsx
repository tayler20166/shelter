import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Match from '@/app/match/page';
import { useFavorites } from '@/hooks/useFavorites';
import { fetchData } from '@/utils/fetchData';


jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));

jest.mock('@/utils/fetchData', () => ({
  fetchData: jest.fn(),
}));

jest.mock('@/components/DogGrid', () => jest.fn(() => <div data-testid="dog-grid"></div>));
jest.mock('@/components/CustomDialog', () =>
  jest.fn(({ children }) => <div data-testid="custom-dialog">{children}</div>)
);
jest.mock('@/components/DogGridCard', () =>
  jest.fn(({ dog }) => <div data-testid="dog-grid-card">{dog.name}</div>)
);

describe('Match Component', () => {
  const mockUseFavorites = useFavorites as jest.Mock;
  const mockFetchData = fetchData as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    mockUseFavorites.mockReturnValue({
      storedDogs: [{ id: '1', name: 'Dog 1' }, { id: '2', name: 'Dog 2' }],
      removeFavoriteDog: jest.fn(),
      favoriteDogIds: ['1', '2'],
    });

    mockFetchData.mockResolvedValueOnce({
      match: { id: '3', name: 'Matched Dog' },
    }).mockResolvedValueOnce([
      { id: '3', name: 'Matched Dog' },
    ]);
  });

  it('renders the component correctly', () => {
  
    render(<Match />);
    expect(screen.getByText('Your Favorite Dogs')).toBeInTheDocument();
    expect(screen.getByText('PUSH THE BUTTON')).toBeInTheDocument();
    expect(screen.getByTestId('dog-grid')).toBeInTheDocument();
  });

  it('displays a dialog with matched dog data when the button is clicked', async () => {
    render(<Match />);
    const button = screen.getByText('PUSH THE BUTTON');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(2);
      expect(screen.getByTestId('custom-dialog')).toBeInTheDocument();
      expect(screen.getByTestId('dog-grid-card')).toHaveTextContent('Matched Dog');
    });
  });

  it('shows no favorite dogs message if the list is empty', () => {
    mockUseFavorites.mockReturnValueOnce({
      storedDogs: [],
      removeFavoriteDog: jest.fn(),
      favoriteDogIds: [],
    });

    render(<Match />);

    expect(screen.getByText('You have no favorite dogs yet.')).toBeInTheDocument();
  });

  it('closes the dialog when onClose is triggered', async () => {
    render(<Match />);
    const button = screen.getByText('PUSH THE BUTTON');

    fireEvent.click(button);

    await waitFor(() => {
      const dialog = screen.getByTestId('custom-dialog');
      expect(dialog).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('custom-dialog'));
    expect(screen.queryByTestId('custom-dialog')).not.toBeInTheDocument();
  });
});