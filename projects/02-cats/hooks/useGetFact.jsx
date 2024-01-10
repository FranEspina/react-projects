import { useState, useEffect } from 'react'

import { getFact } from '../services/factService.js'

function useGetFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getFact().then(newFact => setFact(newFact))
  }

  useEffect(() => refreshFact, [])

  return { fact, refreshFact }
}

export default useGetFact
