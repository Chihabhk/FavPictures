import { useEffect } from "react";
import { CatCard } from "./CatCard";
import { getPicturesAsync } from "../features/picturesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const CatContainer = ()=>{ 
    const dispatch = useDispatch();
    const pictures = useSelector((state) => state.picture);
    // const isLoading = pictures.isLoading
    const [currentPage, setCurrentPage] = useState(1)

    
    useEffect(() => {
        dispatch(getPicturesAsync({page: currentPage}));
    }, [dispatch, currentPage]);
    
    const handleOnClick = ()=>{
        setCurrentPage((state) => state + 1)
    }
    return (
        <div className="main">
            <ul className="fotos-container">
                {pictures && pictures.map((pic) => {
                    return (<CatCard pic={pic} key={pic.id} />);
                })}
            </ul>
            <button
            onClick={handleOnClick}
            >
                Load more...
            </button>
        </div>
    );
}