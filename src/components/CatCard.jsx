import React from "react";
import { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { addPicture } from '../features/catsSlice';

export const CatCard = ({ pic }) => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const handleAddToFavorites = () => {
        dispatch(addPicture(pic));
    };

    const handleLoaded = () => {
        setLoaded(true);
    };

    if (!pic || !pic.id) {
        console.error('Invalid pic or pic._id is missing', pic);
        return null;
    }

    return (
        <li className="card" onClick={handleAddToFavorites}>
            <img 
                src={pic.url} 
                alt={pic.tags ? pic.tags.join(", ") : 'Cat image'} 
                onLoad={handleLoaded} 
                style={{ display: loaded ? 'block' : 'none' }} 
            />
            {!loaded && 
            <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />}
        </li>
    );
};
