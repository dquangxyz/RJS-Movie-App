import React, { useState } from 'react'
import './SearchForm.css'

const SearchForm = (props) => {
    const [query, setQuery] = useState("")

    // Handler functions
    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleClickReset = () => {
        setQuery("")
        props.onReceiveQuery("")
    }

    const handleClickSearch = () => {
        props.onReceiveQuery(query)
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
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={query}
                    />
                    <div className='form-search-icon'>
                        {/* SVG code */}
                    </div>
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
