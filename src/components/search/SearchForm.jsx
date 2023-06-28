import React, { useState, useEffect, useCallback } from 'react'
import './SearchForm.css'

const SearchForm = ({ onReceiveQuery }) => {
    // Local state to capture input
    const [formValues, setFormValues] = useState({
        keyword: "",
        genre: ""
    });

    // Handler functions
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onReceiveQuery(formValues);
    },[formValues, onReceiveQuery]);

    const handleReset = () => {
        setFormValues({ keyword: "", genre: "" });
        onReceiveQuery({ keyword: "", genre: "" });
    };

    // Also handle submit when pressing "Enter" (event from document)
    useEffect(() => {
        const handleEnterKeyPress = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e);
            }
        };
        document.addEventListener("keydown", handleEnterKeyPress);
        return () => {
            document.removeEventListener("keydown", handleEnterKeyPress);
        };
    }, [handleSubmit]);

    
    return (
    <form id="search-form" onSubmit={handleSubmit}>
        <div className="form-upper">
            <div className="form-input-text">
                <input
                    type="text"
                    placeholder="Type Keywords"
                    name="keyword"
                    onChange={handleInputChange}
                    value={formValues.keyword}
                />
                <input
                    type="text"
                    placeholder="Type Genre"
                    name="genre"
                    onChange={handleInputChange}
                    value={formValues.genre}
                />
            </div>
        </div>
        <div className="form-lower">
            <div className="form-group-btn">
                <button className="btn-delete" type="button" onClick={handleReset}>
                    RESET
                </button>
                <button className="btn-search" type="submit">
                    SEARCH
                </button>
            </div>
        </div>
    </form>
    );
};
  
  
  
export default SearchForm
