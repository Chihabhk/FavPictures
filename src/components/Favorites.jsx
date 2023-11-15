import React from 'react';
import { useSelector } from 'react-redux';
import CatCard from './CatCard';

const FavoritePictures = () => {
    const favorites = useSelector((state) => state.cats.favorites);

    return (
        <div>
            {favorites.map((picture) => (
                <CatCard key={picture.id} picture={picture} />
            ))}
        </div>
    );
};

export default FavoritePictures;