import { useState, useRef, useCallback } from 'react'
import { useMovies } from './hooks/useMovies.jsx'
import CardMovie from './components/CardMovie.jsx'
import debounce from 'just-debounce-it'

import './App.css'

function App () {
  const inputRef = useRef('')
  const [search, updateSearch] = useState('')
  const [sort, setSort] = useState(false)

  const { moviesOrdered: movies, getMovies, errorMessage, loading } = useMovies(search, sort)

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies(search)
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(inputRef.current.value)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = (event) => {
    setSort(event.target.checked)
  }

  const listMovies = movies?.map((movie) => <CardMovie key={movie.imdbID} movie={movie.Title} poster={movie.Poster} />)

  return (
    <>
      <main>
        <h1>Mis peliculas</h1>
        <section>
          <h2>Buscador de peliculas</h2>
          <form className='finder-container' onSubmit={handleSubmit}>
            <div className='form-row'>
              <input ref={inputRef} type='text' onChange={handleChange}/>
              <button>Buscar</button>
            </div>
            <div className='form-row'>
              <input id='ordenar' name='ordenar' type='checkbox' onChange={handleSort} checked={sort} />
              <label htmlFor='ordenar'>Ordenar resultados por nombre</label>
            </div>
            {errorMessage && <p className='error-movie'>{errorMessage}</p>}
          </form>
          <div className='movies-container'>
            {loading ? <h2>Cargando ...</h2> : listMovies}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
