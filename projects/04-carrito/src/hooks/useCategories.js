import { useState, useEffect } from 'react'
import { GetCategories } from '../services/categoryServices'

export function useCategories () {
  const [categories, setCategories] = useState(['none'])

  useEffect(
    () => {
      setCategories(GetCategories())
    }, [])

  return { categories }
}
