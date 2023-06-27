import React, { useState } from 'react'
import './SearchForm.css'

const SearchForm = (props) => {
    const [keyword, setKeyword] = useState("")
    const [genre, setGenre] = useState("")

    // Handler functions
    const handleClickReset = () => {
        setKeyword("")
        props.onReceiveQuery("")
    }

    const handleClickSearch = () => {
        props.onReceiveQuery(keyword)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            handleClickSearch();
        }
    }

    return (
        <form id="search-form">
            <div className='form-upper'>
                <div className='form-input-text'>
                    <input
                        type='text'
                        placeholder='Type Keywords'
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={keyword}
                    />
                    <input
                        type='text'
                        placeholder='Type Genre'
                        onChange={(e) => setGenre(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={genre}
                    />
                    
                </div>
            </div>
            <div className='form-lower'>
                <div className='form-group-btn'>
                    <button
                        className='btn-delete'
                        type='button'
                        onClick={handleClickReset}
                    >
                        RESET
                    </button>
                    <button
                        className='btn-search'
                        type='button'
                        onClick={handleClickSearch}
                    >
                        SEARCH
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchForm
