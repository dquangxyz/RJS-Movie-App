import React, { useState, useEffect, useCallback } from 'react'
import './SearchForm.css'

const movieGenres = [ "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"]

const SearchForm = ({ onReceiveQuery }) => {
    // Local state to capture input
    const [formValues, setFormValues] = useState({
        keyword: "",
        genre: "all",
        mediaType: "all"
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
        setFormValues({ keyword: "", genre: "all", mediaType: "all" });
        onReceiveQuery({ keyword: "", genre: "all", mediaType: "all" });
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
                <div className="form-input-field">
                    <label>Keyword</label>
                    <input
                        type="text"
                        placeholder="Type Keywords"
                        name="keyword"
                        onChange={handleInputChange}
                        value={formValues.keyword}
                    />
                </div>
                
                <div className="form-input-field">
                    <label>Genre</label>
                    <select
                        name="genre"
                        onChange={handleInputChange}
                        value={formValues.genre}
                    >
                        <option value="all">All</option>
                        {movieGenres.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-input-field">
                    <label>Media type</label>
                    <select
                        name="mediaType"
                        onChange={handleInputChange}
                        value={formValues.mediaType}
                    >
                        <option value="all">All</option>
                        <option value="movie">Movie</option>
                        <option value="tv">TV</option>
                        <option value="person">Person</option>
                    </select>
                </div>
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
