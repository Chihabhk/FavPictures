import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
    addFavorite,
    removeFavorite,
    setModalOpen,
} from "../features/catsSlice";

export const CatCard = ({ cat }) => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.cats);

    const isFavorite = favorites.some((favorite) => favorite.id === cat.id);

    const { url, breeds } = cat;
    const breedName = breeds[0]?.name || "Cat image";

    const handleAddToFavorites = () => {
        dispatch(isFavorite ? removeFavorite(cat) : addFavorite(cat));
    };

    const handleLoaded = () => {
        setLoaded(true);
    };

    if (!cat || !cat.id) {
        console.error("Invalid cat or cat.id is missing", cat);
        return null;
    }

    return (
        <>
            <li className="card">
                <img
                    src={url}
                    alt={breedName}
                    onLoad={handleLoaded}
                    onClick={() =>
                        dispatch(
                            setModalOpen({ state: true, selectedCat: cat })
                        )
                    }
                    style={{ display: loaded ? "block" : "none" }}
                />
                <button
                    className={`favorite-heart ${isFavorite ? "active" : ""}`}
                    onClick={handleAddToFavorites}>
                    {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                </button>
                {!loaded && (
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                        ]}
                    />
                )}
            </li>
        </>
    );
};
