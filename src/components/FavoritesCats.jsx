import { useDispatch, useSelector } from "react-redux";
import { setFavoritesPage } from "../features/catsSlice";
import { CatCard } from "./CatCard";

export const FavoritesCats = () => {
    const { favorites } = useSelector((state) => state.cats);
    const dispatch = useDispatch();

    const basePath = process.env.REACT_APP_BASE_PATH || "";
    const catUrl = `${basePath}/assets/exploreMore.jpg`;

    const handleOnClick = () => {
        dispatch(setFavoritesPage());
    };

    return favorites.length > 0 ? (
        <ul className="fotos-container">
            {favorites.map((picture) => {
                return picture && <CatCard key={picture.id} cat={picture} />;
            })}
            <div className="exploreMore-card">
                <img
                    src={catUrl}
                    alt="Explore more cat pictures"
                    onClick={handleOnClick}
                />
            </div>
        </ul>
    ) : (
        <div className="no-favorites">
            <h2>
                You don't have any <span>favorites</span> yet!
            </h2>
            <div className="exploreMore-card">
                <img src={catUrl} alt="Explore more cat pictures" />

                <span onClick={handleOnClick}>Explore More...</span>
            </div>
        </div>
    );
};
