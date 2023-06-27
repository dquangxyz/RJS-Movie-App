import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import './MovieDetail.css'

// const API_KEY = '680b2b6d27b52d078554f51447f2f457'
const api_token = '8qlOkxz4wq'
const api_backend_url = `http://localhost:3001/api/movies/video?token=${api_token}`
const img_base_url = 'https://image.tmdb.org/t/p/w500'

const opts = {
	height: '400',
	width: '100%',
	playerVars: {
		autoplay: 0,
	},
};

const MovieDetail = (props) => {
    const [key, setKey] = useState("") // to pass into <YouTube /> card
    console.log("Movie Id", props.id)

    useEffect(() => {
        try {
            // define fetchData function
            const fetchData = async () => {
                // const res = await fetch(`https://api.themoviedb.org/3//movie/${props.id}/videos?api_key=${API_KEY}`)
                const res = await fetch(api_backend_url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ film_id: props.id })
                })

                const newData = await res.json()
                console.log(newData)

                if (newData.success === false) {
                    setKey("")
                    return
                } //return when resource cannot be found 

                if (newData.results[0]){ //if there are results, setKey based on first result "key" property
                    setKey(newData.results[0].key)
                } else { //if there is no result, display backdrop image instead
                    setKey("")
                }
            };
            // call fetchData function to get the data from api
            fetchData()
        } catch(error){
            console.log("Error", error)
        }
    }, [props.id])

    return (
        <div className='movie-detail'>
            <div className='movie-detail-data'>
				<h1 className='movie-detail-title'>{props.title}</h1>
				<hr></hr>
				<h3>Release Date: {props.release_date}</h3>
				<h3>Vote: {props.vote_average} / 10</h3>
				<br></br>
				<p className='movie-detail-overview'>{props.overview}</p>
			</div>
            <div className='movie-detail-trailer'>
                {/* if key is specified, show YouTube card, else show backdrop image */}
                {key !== "" && <YouTube videoId={key} opts={opts}/>}
                {key === "" && <img src={img_base_url + props.backdrop_path} alt="banner"/>}
            </div>
        </div>
    )
}

export default MovieDetail