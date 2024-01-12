import { useEffect, useState } from 'react'
import CardMovie from './components/CardMovie.jsx'
import './App.css'

const IMDB_API_KEY = '4287AD07'
const IMDB_END_POINT = `https://www.omdbapi.com/?apikey=${IMDB_API_KEY}&s=`

function App () {
  const [movie, setMovie] = useState('')
  const [movies, setMovies] = useState('')
  const [textToFind, setTextToFind] = useState('')
  const [urlToFind, setUrlToFind] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const url = `${IMDB_END_POINT}${textToFind}`
    setUrlToFind(url)
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (!data) return

        if (data.Error) {
          console.log('dentro error')
          setErrorMessage(data.Error)
          setMovies([])
          return null
        }

        const newMovies = data.Search.map((movie) => <CardMovie key={movie.imdbID} movie={movie.Title} poster={movie.Poster} />)
        console.log(newMovies)
        setMovies(newMovies)
      })
  }, [textToFind])

  const handleClick = () => {
    setTextToFind(movie)
  }

  const handleChange = (event) => {
    setMovie(event.target.value)
    setErrorMessage('')
  }

  return (
    <>
      <main>
        <h1>Mis peliculas</h1>
        <section>
          <h2>Buscador de peliculas</h2>
          <div className='finder-container'>
            <input type='text' onChange={handleChange} />
            <button onClick={handleClick}>Buscar</button>
            {errorMessage && <p className='error-movie'>{errorMessage}</p>}
          </div>
          <div className='movies-container'>
            {movies}
          </div>
        </section>
      </main>

    </>
  )
}

export default App
