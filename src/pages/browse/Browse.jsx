import React from 'react';
import NavBar from '../../components/browse/NavBar';
import Banner from '../../components/browse/Banner';
import MovieList from '../../components/browse/MovieList';

import './Browse.css'

const API_KEY = '680b2b6d27b52d078554f51447f2f457'
const api_base_url = 'https://api.themoviedb.org/3'

const api_token = '8qlOkxz4wq'
const api_backend_url = 'http://localhost:3001/api/movies'

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

const requestsToBackEnd = {
	fetchTrending: `/trending?token=${api_token}`,
	fetchTopRated: `/top-rate?token=${api_token}`,
	fetchActionMovies: `/discover?token=${api_token}&genre=28`,
	fetchComedyMovies: `/discover?token=${api_token}&genre=35`,
	fetchHorrorMovies: `/discover?token=${api_token}&genre=27`,
	fetchRomanceMovies: `/discover?token=${api_token}&genre=10749`,
	fetchDocumentaries: `/discover?token=${api_token}&genre=99`,
	fetchSearch: `/search?token=${api_token}`,
};



function Browse() {
	return (
		<div className='app'>
			<NavBar />
			<Banner />
			<MovieList type='Original' vertical={true} url={api_base_url + requests.fetchNetflixOriginals}/>

			<MovieList type='Trending' url={api_backend_url + requestsToBackEnd.fetchTrending}/>
			{/* <MovieList type='Trending' url={api_base_url + requests.fetchTrending}/> */}

			<MovieList type='Top Rated Movies' url={api_backend_url + requestsToBackEnd.fetchTopRated}/>
			{/* <MovieList type='Top Rated Movies' url={api_base_url + requests.fetchTopRated}/> */}

			<MovieList type='Action' url={api_backend_url + requestsToBackEnd.fetchActionMovies}/>
			{/* <MovieList type='Action' url={api_base_url + requests.fetchActionMovies}/> */}

			<MovieList type='Comedy' url={api_backend_url + requestsToBackEnd.fetchComedyMovies}/>
			{/* <MovieList type='Comedy' url={api_base_url + requests.fetchComedyMovies}/> */}

			<MovieList type='Horror' url={api_backend_url + requestsToBackEnd.fetchHorrorMovies}/>
			{/* <MovieList type='Horror' url={api_base_url + requests.fetchHorrorMovies}/> */}

			<MovieList type='Romance' url={api_backend_url + requestsToBackEnd.fetchRomanceMovies}/>
			{/* <MovieList type='Romance' url={api_base_url + requests.fetchRomanceMovies}/> */}

			<MovieList type='Documentaries' url={api_backend_url + requestsToBackEnd.fetchDocumentaries}/>
			{/* <MovieList type='Documentaries' url={api_base_url + requests.fetchDocumentaries}/> */}
		</div>
	);
}

export default Browse;

