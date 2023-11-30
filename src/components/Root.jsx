import { useDispatch, useSelector } from "react-redux";
import { MdFavoriteBorder } from "react-icons/md";
import { setFavoritesPage } from "../features/catsSlice";
import { CatContainer } from "./CatContainer";

export const Root = () => {
    const dispatch = useDispatch();
    const { isFavoritesPage } = useSelector((state) => state.cats);

    const handleOpenFavorites = () => {
        dispatch(setFavoritesPage(!isFavoritesPage));
    };
    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            <header>
                <div
                    className="logo"
                    onClick={
                        isFavoritesPage ? handleOpenFavorites : scrollToTop
                    }>
                    <h1>Meow Magnet</h1>
                    <p>A place to share your favorite cat photos.</p>
                </div>
                <div className="favorites-icon" onClick={handleOpenFavorites}>
                    <span>
                        <span>
                            <MdFavoriteBorder />
                        </span>
                        <span>
                            <MdFavoriteBorder />
                        </span>
                        <span>
                            <MdFavoriteBorder />
                        </span>
                    </span>
                    <span className="favorites-label">Favorites</span>
                </div>
            </header>
            <CatContainer />
        </>
    );
};
