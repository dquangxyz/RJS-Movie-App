import React, { useState, useEffect, useCallback } from 'react'
import './SearchForm.css'

const movieGenres = [ "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"]

const SearchForm = ({ onReceiveQuery }) => {
    // Local state to capture input
    const [formValues, setFormValues] = useState({
        keyword: "",
        genre: "all",
        mediaType: "all",
        language: "all",
        year: ""
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
        setFormValues({ keyword: "", genre: "all", mediaType: "all", language: "all", year:"" });
        onReceiveQuery({ keyword: "", genre: "all", mediaType: "all", language: "all", year:"" });
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
                    <label className="form-label">Keyword</label>
                    <input
                        type="text"
                        placeholder="Type Keywords"
                        name="keyword"
                        className="form-input"
                        onChange={handleInputChange}
                        value={formValues.keyword}
                    />
                </div>
                
                <div className="form-input-field">
                    <label className="form-label">Genre</label>
                    <select
                        name="genre"
                        className="form-select"
                        onChange={handleInputChange}
                        value={formValues.genre}
                    >
                        <option value="all">All</option>
                        {movieGenres.map((item, index) => (
                            <option key={index} value={item.toLowerCase()}>{item}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-input-field">
                    <label className="form-label">Media type</label>
                    <select
                        name="mediaType"
                        className="form-select"
                        onChange={handleInputChange}
                        value={formValues.mediaType}
                    >
                        <option value="all">All</option>
                        <option value="movie">Movie</option>
                        <option value="tv">TV</option>
                        <option value="person">Person</option>
                    </select>
                </div>

                <div className="form-input-field">
                    <label className="form-label">Language</label>
                    <select
                        name="language"
                        className="form-select"
                        onChange={handleInputChange}
                        value={formValues.language}
                    >
                        <option value="all">All</option>
                        <option value="en">EN-US</option>
                        <option value="ja">JP</option>
                        <option value="ko">KR</option>
                    </select>
                </div>
                
                <div className="form-input-field">
                    <label className="form-label">Year</label>
                    <input
                        type="text"
                        name="year"
                        className="form-input"
                        onChange={handleInputChange}
                        value={formValues.year}
                    />
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
