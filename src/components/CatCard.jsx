import React, { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { addPicture, deletePicture } from '../features/catsSlice';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";


export const CatCard = ({ pic }) => {
    const [loaded, setLoaded] = useState(false);
    const [favorite, setFavorite] = useState(false)
    const dispatch = useDispatch();

    const handleAddToFavorites = () => {
        favorite ? dispatch(deletePicture(pic)) : dispatch(addPicture(pic)) ;
        setFavorite((state) => !state);
    };

    const handleLoaded = () => {
        setLoaded(true);
    };

    if (!pic || !pic.id) {
        console.error('Invalid pic or pic._id is missing', pic);
        return null;
    }

    return (
        <li className="card">
            <img 
                src={pic.url} 
                alt={pic.tags ? pic.tags.join(", ") : 'Cat image'} 
                onLoad={handleLoaded} 
                style={{ display: loaded ? 'block' : 'none' }} 
            />
            <span className={`favorites-heart ${favorite ? 'active' : ''}`} onClick={handleAddToFavorites}>{favorite? <MdFavorite /> : <MdFavoriteBorder/>}</span>
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
