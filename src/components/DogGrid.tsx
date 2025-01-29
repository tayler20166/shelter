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
        <div className="flex flex-wrap">
            {dogs.map((dog) => (
                <div key={dog.id} className=" w-[32%] ml-[2%] [&:nth-child(3n+1)]:ml-0 mb-[2%]">
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