import { useSelector } from "react-redux";
import { CatCard } from "./CatCard";

export const FavoritesCats = () => {
    const { favorites } = useSelector((state) => state.cats);

    const handleOnClick = () => {
        console.log("clicked");
    };
    return (
        <ul className="fotos-container">
            {favorites &&
                favorites.map((picture) => {
                    return (
                        picture && (
                            <CatCard
                                key={picture.id}
                                cat={picture}
                                onClick={handleOnClick}
                            />
                        )
                    );
                })}
        </ul>
    );
};
