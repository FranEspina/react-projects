import React from 'react'


function CardMovie ({ movie, poster }) {
  return (
    <article className='card-movie'>
      <h2>{movie}</h2>
      <img src={poster} alt='imagen de la pelicula' />
    </article>
  )
}

export default CardMovie
