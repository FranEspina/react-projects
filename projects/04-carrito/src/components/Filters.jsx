import { useContext, useId } from 'react'
import { FilterContext } from '../context/FilterContext'
import { FILTERS } from '../constant.js'

export function Filters () {
  const priceId = useId()
  const categoryId = useId()
  const { filters, setFilters, categories } = useContext(FilterContext)

  const handleChangePrice = (event) => {
    setFilters(
      {
        ...filters,
        minPrice: event.target.value
      }
    )
  }
  const handleChangeCategory = (event) => {
    setFilters(
      {
        ...filters,
        category: event.target.value
      }
    )
  }

  return (
    <section className='filter-container'>
      <h2>Filtros</h2>
      <div className='filters'>
        <div className='price-filter'>
          <label htmlFor={priceId}>Precio</label>
          <input type='range' id={priceId} min='0' max={FILTERS.MAX_PRICE} onChange={handleChangePrice} />
          <p>{filters.minPrice} <span> €</span></p>
        </div>
        <div className='category-filter'>
          <select id={categoryId} onChange={handleChangeCategory}>
            <option value='none'>[Categoría]</option>
            {
              (categories.length > 0)
                ? categories.map(
                  (c, index) => {
                    return (
                      <option key={index} value={c}>{c}</option>
                    )
                  }
                )
                : ''
            }
          </select>
        </div>
      </div>
    </section>
  )
}
