import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=7c696727';

const movie = {
    "Title": "Amazing Spiderman Syndrome",
    "Year": "2012",
    "imdbID": "tt2586634",
    "Type": "movie",
    "Poster": "N/A"
}

const App=() => {

        const [movies, setMovies] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');


        const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await  response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return(
        <div className="App">
            <h1>Movie Land</h1>

            <div className="search">
                <input
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={()=> searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ?(
            <div className="container">
                {movies.map((movie) => (<MovieCard movie={movie}/>))}
            </div>
                    ):(
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>

                    )
            }
        </div>
    );
}

export default App;