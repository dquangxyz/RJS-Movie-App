import React, { useState, useEffect} from 'react'
import MovieDetail from '../browse/MovieDetail'
import './ResultList.css'

const img_base_url = 'https://image.tmdb.org/t/p/w500'

const api_token = '8qlOkxz4wq'
const api_backend_search_url = 'http://localhost:3001/api/movies/search'


const ResultList = (props) => {
    // const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${props.query}`
    const [searchedResults, setSearchedResults] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({
        id: "",
        title: "",
        overview: "",
        release_date: "",
        vote_average: ""
    })
    const [showSelected, setShowSelected] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const url = api_backend_search_url + `?token=${api_token}` + `&page=${currentPage}`

    // handler functions
    const handleViewDetails = (item) => {
        setSelectedMovie({
            id: item.id,
            title: (item.title || item.name),
            overview: item.overview,
            release_date: (item.release_date || item.first_air_date),
            vote_average: item.vote_average,
            backdrop_path: item.backdrop_path
        });

        // if reclick on the current movie => hide it
        // else if click on other movie => setShow true to show that movie
        if(selectedMovie.id === item.id){
            setShowSelected(prevState => !prevState);
        } else {
            setShowSelected(true)
        }
    }

    const handlePaginationNextPage = () => {
        setCurrentPage(prevState => prevState + 1)
    }
    const handlePaginationPreviousPage = () => {
        setCurrentPage(prevState => prevState - 1)
    }

    useEffect(()=>{
        try {
            // define fetchData function
            // const fetchData = async () => {
            //     const res = await fetch(url)
            //     const newData = await res.json()
            //     setSearchedResults(newData.results)
            // }
            const fetchData = async () => {
                try {
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            keyword: props.query.keyword,
                            genre: props.query.genre,
                            mediaType: props.query.mediaType,
                            language: props.query.language,
                            year: props.query.year
                        })
                    });
                
                    if (res.status === 400) {
                        setSearchedResults([]);
                        setTotalPage(1);
                        setCurrentPage(1);
                        throw new Error('No result');
                    } else {
                        const newData = await res.json();
                        console.log(newData);
                        setSearchedResults(newData.results);
                        setTotalPage(newData.total_pages);
                        setCurrentPage(newData.page);
                    }
                } catch (error) {
                    setSearchedResults([]);
                    setTotalPage(1);
                    setCurrentPage(1);
                    console.log(error);
                }
            };
              
            // check if users type in the query, then only call the function
            // else if query is empty, set the results as empty array
            if (props.query.keyword !== ''){
                fetchData();
            } else {
                setSearchedResults([])
                setTotalPage(1);
                setCurrentPage(1);
            }      
        } catch(error){
            console.log("Error", error)
        }
    },[url, props.query]);

    return (
        <div className='movie-list'>
            {showSelected && <MovieDetail 
                id={selectedMovie.id} 
                title={selectedMovie.title}
                overview={selectedMovie.overview} 
                release_date={selectedMovie.release_date}
                vote_average={selectedMovie.vote_average}
                backdrop_path={selectedMovie.backdrop_path}
                onCloseModal={() => setShowSelected(false)}
            />}
            <div className='search-result-container'>
                {searchedResults.map((item, index) => (
                    <img
                        key={index}
                        className=''
                        src={`${img_base_url}${item.poster_path}`} 
                        alt=''
                        onClick={() => handleViewDetails(item)}
                    /> 
                ))}
            </div>

            <div className='pagination'>
                { currentPage-1 > 0 && <span className='pagination-block' onClick={handlePaginationPreviousPage}>{currentPage-1}</span>}
                <span className='pagination-current-page-block'>{currentPage}</span>
                { currentPage+1 <= totalPage && <span className='pagination-block' onClick={handlePaginationNextPage}>{currentPage+1}</span>}
            </div>
        </div>
    )
}

export default ResultList