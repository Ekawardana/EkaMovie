import './App.css';
import {getMovieList, searchMovie} from "./api" //Import dari api.js
import { useEffect, useState } from 'react'; //Import react

const App = () => {
const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  // data gambar dari API di .env
  const urlImage = process.env.REACT_APP_BASEIMGURL

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) =>{
      return(
        // List Film
          <div className="Movie-wrapper" key={i}>
            <div className="Movie-title">{movie.title}</div>
            <img className="Movie-image" src={`${urlImage}/${movie.poster_path}`}/>
            <div className="Movie-date">Release : {movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
          </div> 
      )
    })
  }

  const search = async(q) =>{
    if(q.length > 3 ){
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  console.log({popularMovies: popularMovies})

  return (
    <div className="App">
      <header className="App-header">
        <h1>Eka Movie FILMS</h1>
          <input placeholder='Cari Film Kesukaan...' 
            className='Movie-search'
            onChange={({target}) => search(target.value)}
          />
        <div className="Movie-container">
              <PopularMovieList/>
        </div>
      </header>
    </div>
  );
}

export default App;
