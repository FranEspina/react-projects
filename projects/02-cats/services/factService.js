const FACT_API_URL = 'https://catfact.ninja/fact'

export const getFact = async () => {
  return await fetch(FACT_API_URL)
    .then(res => res.json())
    .then(data => data.fact)
}
