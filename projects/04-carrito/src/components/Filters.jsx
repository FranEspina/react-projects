import { useId, useState } from 'react'
import './Filters.css'

export function Filters () {

  const [price, setPrice] = useState(0)
  const priceId = useId()
  const categoryId = useId()


  const handleChangePrice = (event) => {
    setPrice(event.target.value)
  }

  return (
    <section className="filter-container">
      <h2>Filtros</h2>
      <div className='filters'>
        <div className='price-filter'>
          <label htmlFor={priceId}>Precio</label>
          <input type='range' id={priceId} min='0' max='1000' onChange={handleChangePrice} />
          <p>{price}</p>
        </div>
        <div className='category-filter'>
          <select id={categoryId} >
            <option value='none'>[Categoría]]</option>
            <option value='laptops'>Portatiles</option>
            <option value='mobile'>Móviles</option>
          </select>
        </div>
      </div>
    </section>
  )
}