import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getPicturesByBreedAsync,
    getSearchSuggestions,
    getAllBreedsAsync,
} from "../features/catsSlice";

export const SearchSuggestions = () => {
    const [inputValue, setInputValue] = useState("");
    const suggestions = useSelector((state) => state.cats.suggestions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBreedsAsync());
    }, [dispatch]);

    useEffect(() => {
        if (inputValue) {
            dispatch(getSearchSuggestions(inputValue));
            console.log(inputValue);
        }
    }, [inputValue, dispatch]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSuggestionKeyDown = (event, suggestion) => {
        if (event.key === "Enter") {
            setInputValue(suggestion.name);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.name);
        dispatch(getPicturesByBreedAsync({ breed: suggestion }));
    };

    return (
        <div className="input-wrapper">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Write Something Here..."
                aria-label="Search"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list" role="listbox">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="suggestion-item"
                            tabIndex={0}
                            role="option"
                            aria-selected={inputValue === suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onKeyDown={(event) =>
                                handleSuggestionKeyDown(event, suggestion)
                            }>
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
