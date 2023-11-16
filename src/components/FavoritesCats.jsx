import React from 'react';
import { useSelector } from 'react-redux';
import {CatCard} from './CatCard';

export const FavoritesCats = () => {
    const favorites = useSelector((state) => state.cats.favorites);

    return (
        <div className='favorites'>
            {favorites.map((picture) => (
                <CatCard key={picture.id} picture={picture} />
            ))}
        </div>
    );
};

