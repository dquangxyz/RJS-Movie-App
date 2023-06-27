import React, { useState, useEffect } from 'react';
import './Banner.css';

const API_KEY = '680b2b6d27b52d078554f51447f2f457'
const api_base_url = 'https://api.themoviedb.org/3'
const img_base_url = 'https://image.tmdb.org/t/p/w500'
const requests = {
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

function Banner() {
    const [randomBanner, setRandomBanner] = useState({
		backdrop_path: "",
		name: "",
		overview: ""
	})

	useEffect(()=> {
		// define fetchData function
		const fetchData = async () => {
            try {
                const response = await fetch(api_base_url + requests.fetchNetflixOriginals);
                const newData = await response.json();

				// pick a random movie from the list
				const x = Math.floor(Math.random() * newData.results.length - 1)
                setRandomBanner({
					backdrop_path: newData.results[x].backdrop_path || newData.results[x].poster_path, // if backdrop_path is null, then take poster_path instead
					name: newData.results[x].name,
					overview: newData.results[x].overview
				})
            } catch(error) {
                console.log("Error", error)
            }
		};
		// call fetchData function
		fetchData();
	},[setRandomBanner])

	return (
		<div 
			className="banner" 
			style={{
				backgroundImage:`url("${img_base_url}${randomBanner.backdrop_path}")`,
				backgroundSize: 'cover',
			}}
		>
			<div className='banner-contents'>
				<h1 className='banner-title'>{randomBanner.name}</h1>
				<div className='banner-buttons'>
					<button className='banner-button'>Play</button>
					<button className='banner-button'>My List</button>
				</div>
				<h1 className='banner-description'>{randomBanner.overview}</h1>
			</div>
		</div>
	);
}

export default Banner;

