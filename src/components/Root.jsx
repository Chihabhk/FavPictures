import { CatContainer } from "./CatContainer";
import { FavoritesCats } from "./FavoritesCats";
import { MdFavoriteBorder } from "react-icons/md";


export const Root = () => {
    return (
        <>
            <header>
                <div className="logo">
                    <h1>Meow Magnet</h1>
                    <p>A place to share your favorite cat photos.</p>
                </div>
                <div className="favorites-icon">
                    <span><MdFavoriteBorder /></span>
                    <span><MdFavoriteBorder /></span>
                    <span><MdFavoriteBorder /></span>
                    <span className="favorites-label">Favorites</span>
                </div>
            </header>   
            <CatContainer>
                <FavoritesCats></FavoritesCats>
            </CatContainer>
        </>
    );
}
