import { useEffect } from "react";
import { FavoritesCats } from "./FavoritesCats";
import { CatsExplorer } from "./CatsExplorer";
import { CatModal } from "./CatModal";
import { useSelector, useDispatch } from "react-redux";
import { setModalOpen, getPicturesAsync } from "../features/catsSlice";
import { Loader } from "./Loader";

export const CatContainer = () => {
    const dispatch = useDispatch();
    const {
        currentPage,
        isLoading,
        isFavoritesPage,
        isModalOpen,
        selectedCat,
        images,
    } = useSelector((state) => state.cats);

    useEffect(() => {
        dispatch(getPicturesAsync({ page: currentPage }));
    }, [dispatch, currentPage]);

    return (
        <div className="main">
            {images.length === 0 && isLoading ? (
                <Loader />
            ) : (
                <>{isFavoritesPage ? <FavoritesCats /> : <CatsExplorer />}</>
            )}
            {isModalOpen && (
                <CatModal
                    cat={selectedCat}
                    onClose={() =>
                        dispatch(
                            setModalOpen({ state: false, selectedCat: null })
                        )
                    }
                />
            )}
        </div>
    );
};
