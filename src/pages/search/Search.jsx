import React, { useState } from 'react';
import NavBar from '../../components/browse/NavBar';
import SearchForm from '../../components/search/SearchForm';
import ResultList from '../../components/search/ResultList';

import './Search.css'

const Search = () => {
	const [query, setQuery] = useState({
		keyword: "",
		genre: "all",
		mediaType: "all"
	})
	
	return (
		<div className='app'>
			<NavBar />
			<SearchForm onReceiveQuery={setQuery}/>
			<ResultList query={query}/>
		</div>
	);
};

export default Search;
