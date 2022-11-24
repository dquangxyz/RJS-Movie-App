import React from 'react';
import NavBar from '../../components/browse/NavBar';
import Banner from '../../components/browse/Banner';
import MovieList from '../../components/browse/MovieList';

import './Browse.css'

const API_KEY = '680b2b6d27b52d078554f51447f2f457'
const api_base_url = 'https://api.themoviedb.org/3'

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

function Browse() {
	return (
		<div className='app'>
			<NavBar />
			<Banner />
			<MovieList type='Original' vertical={true} url={api_base_url + requests.fetchNetflixOriginals}/>
			<MovieList type='Trending' url={api_base_url + requests.fetchTrending}/>
			<MovieList type='Top Rated Movies' url={api_base_url + requests.fetchTopRated}/>
			<MovieList type='Action' url={api_base_url + requests.fetchActionMovies}/>
			<MovieList type='Comedy' url={api_base_url + requests.fetchComedyMovies}/>
			<MovieList type='Horror' url={api_base_url + requests.fetchHorrorMovies}/>
			<MovieList type='Romance' url={api_base_url + requests.fetchRomanceMovies}/>
			<MovieList type='Documentaries' url={api_base_url + requests.fetchDocumentaries}/>
		</div>
	);
}

export default Browse;

