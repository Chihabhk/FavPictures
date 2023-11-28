import { useDispatch, useSelector } from "react-redux";
import { CatCard } from "./CatCard";
import { setFavoritesPage } from "../features/catsSlice";

export const FavoritesCats = () => {
    const { images, favorites, isFavoritesPage } = useSelector(
        (state) => state.cats
    );
    const dispatch = useDispatch();
    const randomCat = images[Math.floor(Math.random() * images.length)];

    const handleOnClick = () => {
        dispatch(setFavoritesPage());
    };
    return (
        <ul className="fotos-container">
            {favorites.length > 0 ? (
                favorites.map((picture) => {
                    return (
                        picture && <CatCard key={picture.id} cat={picture} />
                    );
                })
            ) : (
                <div className="no-favorites" onClick={handleOnClick}>
                    explore more
                </div>
            )}
        </ul>
    );
};
