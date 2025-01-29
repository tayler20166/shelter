import { Dog } from '@/types/Interfaces';
import DogGridCard from './DogGridCard';
import { useFavorites } from '@/hooks/useFavorites';

interface DogGridProps {
    dogs: Dog[];
    onCancelClick?: (dog: Dog) => void;
}

export default function DogGrid({ dogs, onCancelClick }: DogGridProps) {
    const { favoriteDogIds, toggleFavorite } = useFavorites();
    const toggleFavoriteHandler = (dog: Dog) => {
        toggleFavorite(dog);
    };
    return (
        <div data-testid="dog-grid" className="flex flex-wrap">
            {dogs.map((dog) => (
                <div key={dog.id} className="w-[100%] mb-[2%] sm:w-[49%] sm:mb-[2%] sm:ml-[2%] sm:[&:nth-child(2n+1)]:ml-0 lg:w-[32%] lg:[&:nth-child(2n+1)]:ml-[2%] lg:[&:nth-child(3n+1)]:ml-0 ">
                    <DogGridCard
                        dog={dog}
                        isFavorite={favoriteDogIds.includes(dog.id)}
                        onToggleFavorite={toggleFavoriteHandler}
                        onCancelClick={onCancelClick ? (dog: Dog) => onCancelClick(dog) : undefined}
                    />
                </div>

            ))}
        </div>
    );
}