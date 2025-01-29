import { useState, useEffect } from 'react';
import { Dog } from '@/types/Interfaces';

export function useFavorites() {
    const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([]);
    const [storedDogs, setStoredDogs] = useState<Dog[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const storedDogsString = localStorage.getItem('favoriteDogs');
            if (storedDogsString) {
                const favoriteDogs: Dog[] = JSON.parse(storedDogsString);
                setStoredDogs(favoriteDogs);
                setFavoriteDogIds(favoriteDogs.map((dog) => dog.id));
            }
        } catch (error) {
            console.error('Failed to parse favorite dogs from localStorage', error);
            setStoredDogs([]);
            setFavoriteDogIds([]);
        }
    }, []);

    const toggleFavorite = (dog: Dog) => {
        const isFavorite = favoriteDogIds.includes(dog.id);

        if (isFavorite) {
            const updatedStoredDogs = storedDogs.filter((item) => item.id !== dog.id);
            setStoredDogs(updatedStoredDogs);

            const updatedFavoriteIds = favoriteDogIds.filter((id) => id !== dog.id);
            setFavoriteDogIds(updatedFavoriteIds);
            localStorage.setItem('favoriteDogs', JSON.stringify(updatedStoredDogs));
        } else {
            const updatedStoredDogs = [...storedDogs, { ...dog }];
            setStoredDogs(updatedStoredDogs);

            const updatedFavoriteIds = [...favoriteDogIds, dog.id];
            setFavoriteDogIds(updatedFavoriteIds);
            localStorage.setItem('favoriteDogs', JSON.stringify(updatedStoredDogs));
        }
    };

    const removeFavoriteDog = (dog: Dog) => {
        const updatedStoredDogs = storedDogs.filter((item) => item.id !== dog.id);
        setStoredDogs(updatedStoredDogs);

        const updatedFavoriteIds = favoriteDogIds.filter((id) => id !== dog.id);
        setFavoriteDogIds(updatedFavoriteIds);
        localStorage.setItem('favoriteDogs', JSON.stringify(updatedStoredDogs));
    };

    return { storedDogs, favoriteDogIds, toggleFavorite, removeFavoriteDog };
}
