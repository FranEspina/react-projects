const IMDB_API_KEY = '4287AD07'
const IMDB_END_POINT = `https://www.omdbapi.com/?apikey=${IMDB_API_KEY}&s=`

export async function getMovies (search) {
  const url = `${IMDB_END_POINT}${search}`
  const res = await fetch(url)
  const data = await res.json()
  if (!data) return null
  if (data.Error) return { error: data.Error }
  else return { movies: data }
}
