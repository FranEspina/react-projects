import { useCallback, useMemo, useState } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies (textToFind, sort) {
  const [movies, setMovies] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const getMovies = useCallback(
    async (textToFind) => {
      setLoading(true)
      setErrorMessage(null)
      setMovies(null)

      try {
        if (!textToFind || textToFind === '') return
        const data = await searchMovies(textToFind)
        if (!data) return
        if (data.error) {
          setErrorMessage(data.error)
        }
        if (data.movies) {
          const newmovies = data.movies.Search
          setMovies(newmovies)
        }
      } finally {
        setLoading(false)
      }
    }
    , [])

  const moviesOrdered = useMemo(
    () => {
      let moviesOrdered = movies
      if (movies && sort) {
        moviesOrdered = [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
      }
      return moviesOrdered
    }
    , [movies, sort])

  return { moviesOrdered, getMovies, errorMessage, loading }
}
