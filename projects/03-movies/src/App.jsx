import { useEffect, useState } from 'react'
import CardMovie from './components/CardMovie.jsx'
import { getMovies } from './services/movies.js'
import './App.css'

function App () {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState('')
  const [textToFind, setTextToFind] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (textToFind === '') return
    getMovies(textToFind).then((data) => {
      if (!data) return
      if (data.error) {
        setErrorMessage(data.error)
        setMovies(null)
        return
      }
      if (data.movies) {
        const newmovies = data.movies.Search
        const listMovies = newmovies.map((movie) => <CardMovie key={movie.imdbID} movie={movie.Title} poster={movie.Poster} />)
        setMovies(listMovies)
      }
    })
  }, [textToFind])

  const handleClick = (event) => {
    event.preventDefault()
    setTextToFind(search)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
    setErrorMessage('')
  }

  return (
    <>
      <main>
        <h1>Mis peliculas</h1>
        <section>
          <h2>Buscador de peliculas</h2>
          <form className='finder-container'>
            <input type='text' onChange={handleChange} />
            <button onClick={handleClick}>Buscar</button>
            {errorMessage && <p className='error-movie'>{errorMessage}</p>}
          </form>
          <div className='movies-container'>
            {movies}
          </div>
        </section>
      </main>

    </>
  )
}

export default App
