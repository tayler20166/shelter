'use client'
import { Dog, Match as MatchResult } from '@/types/Interfaces';
import { useState, useRef } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import DogGrid from '@/components/DogGrid';
import { fetchData } from '@/utils/fetchData';
import CustomDialog from '@/components/CustomDialog';
import DogGridCard from '@/components/DogGridCard';

export default function Match() {
    const { storedDogs, removeFavoriteDog, favoriteDogIds } = useFavorites();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [dogData, setDogData] = useState<Dog | null>(null);

    const removeFavorite = (dog: Dog) => {
        removeFavoriteDog(dog);
    };

    const requestDog = async () => {
        const result: MatchResult = await fetchData(API_BASE_URL + '/dogs/match', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(favoriteDogIds),
        });
        if (result) {
            const data: Dog[] = await fetchData(API_BASE_URL + '/dogs', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([result.match]),
            });
            if (data[0]) {
                setDogData(data[0]);
                dialogRef.current?.showModal();
            }

        }
    };
    const closeDialog = () => {
        setDogData(null);
        dialogRef.current?.close();
    };
    
    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-4">Your Favorite Dogs</h1>
                <p>Make a request to get a suitable dog for you by clicking the button</p>

                <button data-testid="dog-button-popup" onClick={requestDog} className="bg-red-500 text-white text-xl px-8 py-3 mt-4">PUSH THE BUTTON</button>
            </div>


            <CustomDialog
                title="We have a winner!!!"
                subtitle="Match was done based on your favorite dogs list."
                ref={dialogRef}
                onClose={closeDialog}>
                {dogData && <DogGridCard dog={dogData} />}
            </CustomDialog>
          
            {storedDogs.length > 0 ? (
                <DogGrid
                    dogs={storedDogs}
                    onCancelClick={removeFavorite}
                />
            ) : (
                <p className="text-lg">You have no favorite dogs yet.</p>
            )}
        </div>
    );
}




