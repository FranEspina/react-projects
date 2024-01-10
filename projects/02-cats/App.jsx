import { React } from 'react'
import useGetFact from './hooks/useGetFact.jsx'
import useGetCatImage from './hooks/useGetCatImage.jsx'
import './App.css'

function App () {
  const { fact, refreshFact } = useGetFact()
  const imageSrc = useGetCatImage(fact)

  return (
    <>
      <main className='main'>
        <h1>Selección de Gatos</h1>
        <section className='cat-container'>
          {fact && <p>{fact}</p>}
          {imageSrc && <img src={imageSrc} alt='imagen de un gato' />}
          <button onClick={refreshFact}>Resetear Gato</button>
        </section>
      </main>
    </>
  )
}

export default App
