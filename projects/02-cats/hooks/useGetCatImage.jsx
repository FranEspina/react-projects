import { useEffect, useState } from 'react'

const IMAGE_KEY = '#word#'
const IMAGE_API_URL = `https://cataas.com/cat/says/${IMAGE_KEY}`

const extractFirstWord = (text) => {
  if (!text) return ''
  return text.split(' ')[0]
}

function useGetCatImage (fact) {
  const [imageSrc, setImageSrc] = useState()

  useEffect(() => {
    const firstWord = extractFirstWord(fact)
    const url = IMAGE_API_URL.replace(IMAGE_KEY, firstWord)

    fetch(url)
      .then(res => res.blob())
      .then(blob => setImageSrc(URL.createObjectURL(blob)))
  }, [fact])

  return imageSrc
}

export default useGetCatImage
