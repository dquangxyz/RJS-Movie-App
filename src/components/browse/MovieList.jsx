import React, { useEffect, useState } from 'react'
import MovieDetail from './MovieDetail';

import './MovieList.css';

const img_base_url = 'https://image.tmdb.org/t/p/w500'


const MovieList = (props) => {
    const [data, setData] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({
        id: "",
        title: "",
        overview: "",
        release_date: "",
        vote_average: "",
        backdrop_path: "",
    })
    const [showSelected, setShowSelected] = useState(false)

    useEffect(()=>{
        try {
            // define function to fetch data from props.url from parent
            const fetchData = async () => {
                const res = await fetch(props.url)
                const newData = await res.json()
                setData(newData.results)
            }
            // call function
            fetchData();
        } catch(error){
            console.log("Error", error)
        }
    },[setData, props.url]);

    return (
        <div className='movie-list'>
            <h2 className="movie-list-title">{props.type}</h2>
            <div className='movie-list-row sc2'>
                {data.map((item, index) => (
                    <img
                        key={index}
                        className={props.vertical ? 'movie-poster-large' : 'movie-poster'} // props.vertical = true only for Original Netflix list
                        src={props.vertical ? `${img_base_url}${item.poster_path}` : `${img_base_url}${item.backdrop_path}`} // props.vertical = true only for Original Netflix list
                        alt=''
                        onClick={()=>{
                            setSelectedMovie({
                                id: item.id,
                                title: (item.title || item.name),
                                overview: item.overview,
                                release_date: (item.release_date || item.first_air_date),
                                vote_average: item.vote_average,
                                backdrop_path: item.backdrop_path,
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
            
            {showSelected && <MovieDetail 
                id={selectedMovie.id} 
                title={selectedMovie.title}
                overview={selectedMovie.overview} 
                release_date={selectedMovie.release_date}
                vote_average={selectedMovie.vote_average}
                backdrop_path={selectedMovie.backdrop_path}
            />}
        </div>
    )
}

export default MovieList