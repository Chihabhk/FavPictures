import { CatCard } from "./CatCard";
import { useDispatch, useSelector } from "react-redux";
import { exploreMore } from "../features/catsSlice";
import { Loader } from "./Loader";

export const CatsExplorer = () => {
    const { images, isLoading } = useSelector((state) => state.cats);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(exploreMore());
    };

    return (
        <>
            <ul className="fotos-container">
                {images.map((picture) => {
                    return <CatCard cat={picture} key={picture.id} />;
                })}
            </ul>
            {isLoading && images.length > 0 && <Loader />}
            <button onClick={handleOnClick}>Load more...</button>
        </>
    );
};
