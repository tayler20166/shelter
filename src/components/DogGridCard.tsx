import { Dog } from '@/types/Interfaces';

interface DogGridCardProps {
    dog: Dog;
    isFavorite?: boolean
    onToggleFavorite?: (dog: Dog) => void;
    onCancelClick?: (dog: Dog) => void;
}
export default function DogGridCard({ dog, isFavorite, onToggleFavorite, onCancelClick }: DogGridCardProps) {

    return (
        <div data-testid="dog-card" className="dark:bg-[#1e1f23] bg-white border border-[#f5f5f5] min-w-[280px] rounded-md drop-shadow-xl" key={dog.id}>
            <div className="relative w-full aspect-[4/3] bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${dog.img})` }}
            >
                {onCancelClick && (
                    <button data-testid="cancel-dog-button" onClick={() => { onCancelClick(dog) }}>
                        <span className="material-symbols-outlined absolute top-[5px] right-[5px] cursor pointer bg-white bg-opacity-10">
                            close
                        </span>
                    </button>
                )}
            </div>
            <div className="p-3">
                <div className="flex justify-between">
                    <div className="text-xl font-semibold mb-2">{dog.name} </div>
                    {onToggleFavorite && (
                        <div><button data-testid="toggle-favorite-dog-button" onClick={() => { onToggleFavorite(dog) }}>
                            <span className={`material-symbols-outlined ${isFavorite ? 'filled' : ''}`}>
                                favorite
                            </span>
                        </button>
                        </div>
                    )}
                </div>

                <div><span className="font-medium">Breed:</span> {dog.breed}</div>
                <div><span className="font-medium">Age:</span> {dog.age}</div>
                <div><span className="font-medium">Zip code:</span> {dog.zip_code}</div>

            </div>

        </div>
    )
}