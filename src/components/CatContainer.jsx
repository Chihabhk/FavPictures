import { useEffect } from "react";
import { CatCard } from "./CatCard";
import { getPicturesAsync } from "../features/catsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {Vortex} from 'react-loader-spinner'

export const CatContainer = ()=>{ 
    const dispatch = useDispatch();
    const {images, isLoading } = useSelector((state) => state.cats);
    const [currentPage, setCurrentPage] = useState(0)

    
    useEffect(() => {
        dispatch(getPicturesAsync({page: currentPage}));
    }, [dispatch, currentPage]);
    
    const handleOnClick = ()=>{
        setCurrentPage((state) => state + 1)
    }
    return (
        <div className="main">
            {currentPage === 0 && isLoading ? 
            (
                <div className="loading">
                    <Vortex
                    visible={true}
                    height="110"
                    width="110"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
                </div>
            )  
            :( 
                <>
                    <ul className="fotos-container">
                        {images && images.map((pic) => {
                            return (<CatCard pic={pic} key={pic.id} />);
                        })}
                    </ul>
                    <button onClick={handleOnClick}>
                        Load more...
                    </button>
                </>  
            )
            }
        </div>
    );
}