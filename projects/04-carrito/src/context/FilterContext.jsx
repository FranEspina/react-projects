import { createContext, useState } from 'react'

export const FilterContext = createContext(null)

export function FilterProvider ({ children }) {
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState(
    {
      minPrice: 0,
      category: 'none'
    }
  )

  return (
    <FilterContext.Provider value={{
      filters,
      setFilters,
      categories,
      setCategories
    }}
    >
      {children}
    </FilterContext.Provider>
  )
}
