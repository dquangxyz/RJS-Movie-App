import React, { useState, useEffect} from 'react'
import MovieDetail from '../browse/MovieDetail'
import './ResultList.css'


const API_KEY = '680b2b6d27b52d078554f51447f2f457'
const img_base_url = 'https://image.tmdb.org/t/p/w500'


const ResultList = (props) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${props.query}`
    const [searchedResults, setSearchedResults] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({
        id: "",
        title: "",
        overview: "",
        release_date: "",
        vote_average: ""
    })
    const [showSelected, setShowSelected] = useState(false)

    useEffect(()=>{
        console.log("ResultList useEffect runs")
        try {
            // define fetchData function
            const fetchData = async () => {
                const res = await fetch(url)
                const newData = await res.json()
                setSearchedResults(newData.results)
            }

            // check if users type in the query, then only call the function
            // else if query is empty, set the results as empty array
            if (props.query){
                fetchData();
            } else {
                setSearchedResults([])
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
            />}
            <div className='search-result-container'>
                {searchedResults.map((item, index) => (
                    <img
                        key={index}
                        className=''
                        src={`${img_base_url}${item.poster_path}`} 
                        alt=''
                        onClick={()=>{
                            setSelectedMovie({
                                id: item.id,
                                title: (item.title || item.name),
                                overview: item.overview,
                                release_date: (item.release_date || item.first_air_date),
                                vote_average: item.vote_average
                            });

                            // if reclick on the current movie => hide it
                            // else if click on other movie => setShow true to show that movie
                            if(selectedMovie.id === item.id){
                                setShowSelected(prevState => !prevState);
                            } else {
                                setShowSelected(true)
                            }                     
                        }}
                    /> 
                ))}
            </div>
        </div>
    )
}

export default ResultList